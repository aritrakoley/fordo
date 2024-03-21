import { PGSCHEMA } from "../configs/constants";
import { pool } from "../db/fordo-db.main";
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
    const { ingredient_name, ingredient_details, linked_recipe } = ingredient;
    const vals = [
      ingredient_name || null,
      ingredient_details || null,
      linked_recipe || null,
    ];

    const res1 = await client.query(sqlIngredient, vals);

    if (ingredient.local_names?.length) {
      const valLocalNames = [
        ingredient.local_names
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
