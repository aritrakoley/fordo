import { PGSCHEMA } from "../configs/constants";
import { pool, simpleQuery } from "../db/fordo-db.main";
import { Tag } from "../types/tag.types";

export const insertTag = async (tag: Partial<Tag>) => {
  const sql = `
        insert into ${PGSCHEMA}.tag (
            tag_label,
            is_active
        )
        values (
            $1, 
            true
        )
        returning id;
      `;
  return await simpleQuery(sql, [tag.tag_label]);
};

export const updateTag = async (tag: Partial<Tag>) => {
  let ok = true;
  let result = null;
  let error = null;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sqlSelect = `
            select 
                id, 
                tag_label,
                is_active  
            from 
                ${PGSCHEMA}.tag
            where
                id = $1
            ;
        `;
    const valSelect = [tag.id];
    const resTag = (await client.query(sqlSelect, valSelect)).rows[0];

    const sqlUpdate = `
            update 
               ${PGSCHEMA}.tag
            set
                tag_label = $2,
                is_active = $3 
            where 
                id = $1
            returning id;
            ;
        `;
    const valUpdate = [
      tag.id,
      tag.tag_label || resTag.tag_label,
      tag.is_active || resTag.is_active,
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

export const listTag = async (tagIds: number[]) => {
  const sql = `
        select 
            id,
            tag_label
        from 
            ${PGSCHEMA}.tag
        where
            is_active = true
            ${tagIds?.length ? "and id in ($1)" : ""}
        ;
    `;

  const val: number[][] = [];
  if (tagIds?.length) val.push(tagIds);
  const [ok, result, error] = await simpleQuery(sql, val);
  return [ok, result, error];
};
