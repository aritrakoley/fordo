import { PGSCHEMA } from "../configs/constants";
import { pool, simpleQuery } from "../db/fordo-db.main";
import { Ingredient } from "../types/ingredient.types";

export const insertIngredient = async (ingredient: Partial<Ingredient>) => {
  let ok = true;
  let result = null;
  let error = null;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sqlIngredient = `
        insert into ${PGSCHEMA}.ingredient(
            ingredient_name,
            ingredient_details,
            linked_recipe,
            is_active
        ) values (
            $1,
            $2,
            $3,
            true
        )
        returning id;
    `;
    const { ingredient_name, ingredient_details, linked_recipe, local_names } =
      ingredient;
    const vals = [
      ingredient_name || null,
      ingredient_details || null,
      linked_recipe || null,
    ];

    const res1 = await client.query(sqlIngredient, vals);

    if (local_names?.length) {
      const valLocalNames = [
        local_names
          .map((l) => `('${res1.rows[0].id}', '${l}', true)`)
          .join(","),
      ];
      const sqlLocalNames = `
        insert into ${PGSCHEMA}.ingredient_local_name (
            ingredient_id,
            local_name,
            is_active
        ) values ${valLocalNames};
    `;

      await client.query(sqlLocalNames);
    }

    await client.query("COMMIT");

    result = res1.rows[0].id;
  } catch (err) {
    await client.query("ROLLBACK");

    ok = false;
    error = err;
  } finally {
    client.release();
  }
  return [ok, result, error];
};

export const updateIngredient = async (ingredient: Partial<Ingredient>) => {
  let ok = true;
  let result = null;
  let error = null;

  const {
    id: ingredient_id,
    ingredient_name,
    ingredient_details,
    linked_recipe,
    is_active,
    local_names,
  } = ingredient;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // read old ingredient
    const sqlRead = `
      select 
        id,
        ingredient_name,
        ingredient_details,
        linked_recipe,
        is_active
      from 
        ${PGSCHEMA}.ingredient
      where
        id = $1
    `;
    const oldIngredient = (await client.query(sqlRead, [ingredient_id]))
      .rows[0];

    // update to new values
    const sqlUpdate = `
      update ${PGSCHEMA}.ingredient
      set 
        ingredient_name = $2,
        ingredient_details = $3,
        linked_recipe = $4,
        is_active = $5
      where 
        id = $1
      returning id;
    `;

    const vals: (string | number | boolean | null)[] = [
      ingredient_id || oldIngredient.ingredient_id,
      ingredient_name || oldIngredient.ingredient_name,
      ingredient_details || oldIngredient.ingredient_details,
      linked_recipe || oldIngredient.linked_recipe,
      typeof is_active === "boolean" ? is_active : oldIngredient.is_active,
    ];

    const res = await client.query(sqlUpdate, vals);

    // If local names were edited, remove old ones and insert new ones
    if (local_names?.length) {
      const sqlDelLocalNames = `
        delete from ${PGSCHEMA}.ingredient_local_name
        where ingredient_id = $1;
      `;

      await client.query(sqlDelLocalNames, [ingredient_id]);

      const valLocalNames = [
        local_names.map((l) => `('${res.rows[0].id}', '${l}', true)`).join(","),
      ];

      const sqlLocalNames = `
        insert into ${PGSCHEMA}.ingredient_local_name (
            ingredient_id,
            local_name,
            is_active
        ) values ${valLocalNames};
      `;

      await client.query(sqlLocalNames);
    }

    await client.query("COMMIT");

    result = res.rows[0].id;
  } catch (err) {
    await client.query("ROLLBACK");

    ok = false;
    error = err;
  } finally {
    client.release();
  }
  return [ok, result, error];
};

export const listIngredient = async (ingredientIds: number[]) => {
  const sql = `
    select 
      id,
      ingredient_name,
      ingredient_details,
      linked_recipe
    from 
      ${PGSCHEMA}.ingredient
    where
      is_active = true
      ${ingredientIds?.length ? "and id in ($1)" : ""}
    ;
  `;

  const val: number[][] = [];
  if (ingredientIds?.length) val.push(ingredientIds);
  const [ok, result, error] = await simpleQuery(sql, val);
  return [ok, result, error];
};
