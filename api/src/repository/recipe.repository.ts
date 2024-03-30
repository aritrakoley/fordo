import { PGSCHEMA } from "../configs/constants";
import { pool, simpleQuery } from "../db/fordo-db.main";
import { Recipe, RecipeUpdateRequest } from "../types/recipe.types";

export const insertRecipe = async (recipe: Partial<Recipe>) => {
  let ok = true;
  let result = null;
  let error = null;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sqlRecipe = `
      insert into ${PGSCHEMA}.recipe(
        recipe_name,
        prep_time,
        cook_time,
        calorie_count,
        serving_size,
        is_active
      ) values (
          $1,
          $2,
          $3,
          $4,
          $5,
          true
      )
      returning id;
    `;
    const {
      recipe_name,
      prep_time,
      cook_time,
      calorie_count,
      serving_size,
      meal_types,
      tags,
      ingredients,
      steps,
      notes,
    } = recipe;
    const vals = [
      recipe_name || null,
      prep_time || null,
      cook_time || null,
      calorie_count || null,
      serving_size || null,
    ];

    const newRecipeId = (await client.query(sqlRecipe, vals)).rows[0].id;

    if (meal_types?.length) {
      const valMT = [
        meal_types
          .map((mtId) => `('${newRecipeId}', '${mtId}', true)`)
          .join(","),
      ];
      const sqlMT = `
        insert into ${PGSCHEMA}.recipe_meal_type_map (
            recipe_id,
            meal_type_id,
            is_active
        ) values ${valMT};
    `;

      await client.query(sqlMT);
    }

    if (steps?.length) {
      const valS = [
        steps
          .map(
            (s) =>
              `('${newRecipeId}', '${s.sort_order}', '${s.title}', '${s.body}', true)`
          )
          .join(","),
      ];
      const sqlS = `
        insert into ${PGSCHEMA}.recipe_step (
            recipe_id,
            sort_order,
            title,
            body,
            is_active
        ) values ${valS};
    `;

      await client.query(sqlS);
    }

    if (ingredients?.length) {
      const valI = [
        ingredients
          .map(
            (i) =>
              `('${newRecipeId}', '${i.id}', '${i.quantity}', '${i.unit}', true)`
          )
          .join(","),
      ];

      const sqlI = `
        insert into ${PGSCHEMA}.recipe_ingredient_map (
          recipe_id,
          ingredient_id,
          quantity,
          unit,
          is_active
        ) values ${valI};
      `;

      await client.query(sqlI);
    }

    if (tags?.length) {
      const valT = [
        tags.map((tid) => `('${newRecipeId}', '${tid}', true)`).join(","),
      ];

      const sqlT = `
        insert into ${PGSCHEMA}.recipe_tag_map (
          recipe_id,
          tag_id,
          is_active
        ) values ${valT};
      `;

      await client.query(sqlT);
    }

    // TODO: 'insert multiple notes' should be common function
    if (notes?.length) {
      const valN = [
        notes
          .map((n) => `('${newRecipeId}', '${n.title}', '${n.body}', true)`)
          .join(","),
      ];

      const sqlN = `
        insert into ${PGSCHEMA}.note (
          recipe_id,
          title,
          body,
          is_active
        ) values ${valN};
      `;

      await client.query(sqlN);
    }

    await client.query("COMMIT");

    result = newRecipeId;
  } catch (err) {
    await client.query("ROLLBACK");

    ok = false;
    error = err;
  } finally {
    client.release();
  }
  return [ok, result, error];
};

export const getRecipeDetails = async (recipeId: number) => {
  const sql = `
    with 
    iln as (
      select 
        ingredient_id,
        coalesce(array_agg(local_name) filter (where local_name is not null), '{}') as local_names
      from fordo.ingredient_local_name
      where is_active = true
      group by ingredient_id
    ),
    i as (
      select
        rim.recipe_id,
        i.id,
        any_value(i.ingredient_name) as ingredient_name ,
        any_value(i.ingredient_details) as ingredient_details ,
        any_value(i.linked_recipe) as linked_recipe,
        any_value(iln.local_names) as local_names
      from 
        fordo.recipe_ingredient_map rim
        join fordo.ingredient i
          on i.id = rim.ingredient_id
          and rim.recipe_id = $1
          and rim.is_active = true
          and i.is_active = true
        left join iln	
          on	iln.ingredient_id = i.id
      group by 
        rim.recipe_id,
        i.id
    ),
    s as (
      select 
        recipe_id,
        id,
        sort_order,
        title,
        body
      from fordo.recipe_step
      where 
        recipe_id = $1
        and is_active = true
      order by sort_order
    ),
    mt as (
      select 
        mtm.recipe_id,
        mt.id,
        mt.meal_type_label
      from 
        fordo.recipe_meal_type_map mtm
        join fordo.meal_type mt 
          on mtm.meal_type_id = mt.id
          and mt.is_active = true
      where 
        mtm.recipe_id = $1
        and mtm.is_active = true
    ),
    t as (
      select 
      rtm.recipe_id,
      t.id,
      t.tag_label
      from 
        fordo.recipe_tag_map rtm
        join fordo.tag t
          on t.id = rtm.tag_id
          and t.is_active = true
      where 
        rtm.is_active = true
        and rtm.recipe_id = $1
    ),
    n as (
      select 
        recipe_id,
        id,
        title,
        body
      from fordo.note
      where 
        recipe_id = $1
        and is_active = true
    )
    select 
      r.id,
      r.recipe_name,
      r.prep_time,
      r.cook_time,
      r.calorie_count,
      r.serving_size,
      array_agg( 
        distinct jsonb_build_object(
          'id',		mt.id,
          'label',		mt.meal_type_label
        )
      ) as meal_types,
      array_agg( 
        distinct jsonb_build_object(
          'id',		i.id,
          'ingredient_name',		i.ingredient_name,
          'ingredient_details',		i.ingredient_details,
          'linked_recipe',		i.linked_recipe,
          'local_names',	i.local_names
        )
      ) as ingredients,
      array_agg(
        distinct jsonb_build_object(
          'id', s.id,
          'sort_order', s.sort_order,
          'title', s.title,
          'body', s.body
        )
      ) as steps,
      array_agg( 
        distinct jsonb_build_object(
          'id',	t.id,
          'label', t.tag_label
        )
      ) as tags,
      array_agg(
        distinct jsonb_build_object(
          'id', n.id,
          'title', n.title,
          'body', n.body
        )
      ) as notes
    from
      fordo.recipe r
      left join i on i.recipe_id = r.id
      left join s on s.recipe_id = r.id
      left join mt on mt.recipe_id = r.id
      left join t on t.recipe_id = r.id
      left join n on n.recipe_id = r.id
    where 
      r.id = $1
      and r.is_active = true
    group by
      r.id
    ;
  `;

  return await simpleQuery(sql, [recipeId]);
};

export const updateRecipe = async (recipe: RecipeUpdateRequest) => {
  let ok = true;
  let result = null;
  let error = null;

  const {
    id: recipe_id,
    is_active,
    recipe_name,
    prep_time,
    cook_time,
    calorie_count,
    serving_size,
    meal_types,
    tags,
    ingredients,
    steps,
    notes,
  } = recipe;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const [oldOk, oldRes, oldError] = await getRecipeDetails(recipe_id);
    const oldRecipe = oldRes?.[0] as unknown as Recipe;
    oldRecipe.is_active = true;

    if (!oldRecipe) throw "Recipe not found";
    console.log({ oldRecipe });

    const sqlRecipe = `
      update ${PGSCHEMA}.recipe
      set
        recipe_name = $2,
        prep_time= $3,
        cook_time= $4,
        calorie_count= $5,
        serving_size= $6,
        is_active= $7
      where 
        id = $1
      returning id;
    `;
    const {
      id,
      recipe_name,
      prep_time,
      cook_time,
      calorie_count,
      serving_size,
      meal_types,
      tags,
      ingredients,
      steps,
      notes,
      is_active,
    } = recipe;
    const vals = [
      id,
      recipe_name || oldRecipe.recipe_name,
      prep_time || oldRecipe.prep_time,
      cook_time || oldRecipe.cook_time,
      calorie_count || oldRecipe.calorie_count,
      serving_size || oldRecipe.serving_size,
      typeof is_active === "boolean" ? is_active : oldRecipe.is_active,
    ];

    await client.query(sqlRecipe, vals);
    console.log({ vals });

    if (meal_types?.length) {
      const sqlDisable = `update ${PGSCHEMA}.recipe_meal_type_map set is_active = false where recipe_id = $1`;
      await client.query(sqlDisable, [id]);
      console.log("disable MT");

      const valMT = [
        meal_types.map((mtId) => `(${id}, ${mtId}, true)`).join(","),
      ];

      const sqlMT = `
        insert into ${PGSCHEMA}.recipe_meal_type_map (
          recipe_id,
          meal_type_id,
          is_active
        ) values ${valMT};
    `;

      console.log({ sqlMT });
      await client.query(sqlMT);
      console.log({ valMT });
    }

    if (steps?.length) {
      console.log("disable s");
      const sqlDisable = `update ${PGSCHEMA}.recipe_steps set is_active = false where recipe_id = $1`;
      await client.query(sqlDisable, [id]);

      const valS = [
        steps
          .map(
            (s) =>
              `('${id}', '${s.sort_order}', '${s.title}', '${s.body}', true)`
          )
          .join(","),
      ];
      const sqlS = `
        insert into ${PGSCHEMA}.recipe_step (
            recipe_id,
            sort_order,
            title,
            body,
            is_active
        ) values ${valS};
    `;

      await client.query(sqlS, valS);
      console.log({ valS });
    }

    if (ingredients?.length) {
      const sqlDisable = `update ${PGSCHEMA}.recipe_ingredient_map set is_active = false where recipe_id = $1`;
      await client.query(sqlDisable, [id]);

      const valI = [
        ingredients
          .map(
            (i) => `('${id}', '${i.id}', '${i.quantity}', '${i.unit}', true)`
          )
          .join(","),
      ];

      const sqlI = `
        insert into ${PGSCHEMA}.recipe_ingredient_map (
          recipe_id,
          ingredient_id,
          quantity,
          unit,
          is_active
        ) values ${valI};
      `;

      await client.query(sqlI);
    }

    if (tags?.length) {
      const sqlDisable = `update ${PGSCHEMA}.recipe_tag_map set is_active = false where recipe_id = $1`;
      await client.query(sqlDisable, [id]);

      const valT = [tags.map((tid) => `('${id}', '${tid}', true)`).join(",")];

      const sqlT = `
        insert into ${PGSCHEMA}.recipe_tag_map (
          recipe_id,
          tag_id,
          is_active
        ) values ${valT};
      `;

      await client.query(sqlT);
    }

    // TODO: 'insert multiple notes' should be common function
    if (notes?.length) {
      console.log("b4");
      const sqlDisable = `update ${PGSCHEMA}.note set is_active = false where recipe_id = $1`;
      await client.query(sqlDisable, [id]);

      const valN = [
        notes
          .map((n) => `('${id}', '${n.title}', '${n.body}', true)`)
          .join(","),
      ];

      const sqlN = `
        insert into ${PGSCHEMA}.note (
          recipe_id,
          title,
          body,
          is_active
        ) values ${valN};
      `;

      await client.query(sqlN);
      console.log({ valN });
    }

    await client.query("COMMIT");

    result = id;
  } catch (err) {
    await client.query("ROLLBACK");

    ok = false;
    error = err;
  } finally {
    client.release();
  }
  return [ok, result, error];
};

export const listRecipe = async (ids: number[]) => {
  const sql = `
    select 
      r.id,
      r.recipe_name,
      r.prep_time,
      r.cook_time
    from 
      ${PGSCHEMA}.recipe r
    where 
      r.is_active = true
      ${ids?.length ? "and id in ($1)" : ""}
    ;
  `;

  const val: number[][] = [];
  if (ids?.length) val.push(ids);
  const [ok, result, error] = await simpleQuery(sql, val);
  return [ok, result, error];
};
