import { PGSCHEMA } from "../configs/constants";
import { pool, simpleQuery } from "../db/fordo-db.main";
import { MealType } from "../types/mealType.types";

export const insertMealType = async (mealType: Partial<MealType>) => {
  const sql = `
        insert into ${PGSCHEMA}.meal_type (
            meal_type_label,
            is_active
        )
        values (
            $1, 
            true
        )
        returning id;
      `;
  return await simpleQuery(sql, [mealType.meal_type_label]);
};

export const updateMealType = async (mealType: Partial<MealType>) => {
  let ok = true;
  let result = null;
  let error = null;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sqlSelect = `
            select 
                id, 
                meal_type_label,
                is_active  
            from 
                ${PGSCHEMA}.meal_type
            where
                id = $1
            ;
        `;
    const valSelect = [mealType.id];
    const resMealType = (await client.query(sqlSelect, valSelect)).rows[0];

    const sqlUpdate = `
            update 
               ${PGSCHEMA}.meal_type
            set
                meal_type_label = $2,
                is_active = $3 
            where 
                id = $1
            returning id;
            ;
        `;
    const valUpdate = [
      mealType.id,
      mealType.meal_type_label || resMealType.meal_type_label,
      mealType.is_active || resMealType.is_active,
    ];
    const resUpdate = await client.query(sqlUpdate, valUpdate);

    await client.query("COMMIT");

    result = resUpdate.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");

    ok = false;
    error = err;
  } finally {
    client.release();
  }

  return [ok, result, error];
};

export const listMealType = async (mealTypeIds: number[]) => {
  const sql = `
        select 
            id,
            meal_type_label
        from 
            ${PGSCHEMA}.meal_type
        where
            is_active = true
            ${mealTypeIds?.length ? "and id in ($1)" : ""}
        ;
    `;

  const val: number[][] = [];
  if (mealTypeIds?.length) val.push(mealTypeIds);
  const [ok, result, error] = await simpleQuery(sql, val);
  return [ok, result, error];
};
