import { PGSCHEMA } from "../configs/constants";
import { pool, simpleQuery } from "../db/fordo-db.main";
import { Note } from "../types/note.types";

export const insertNote = async (note: Partial<Note>) => {
  const sql = `
        insert into ${PGSCHEMA}.note (
            recipe_id,
            title,
            body,
            is_active
        )
        values (
            $1,
            $2,
            $3 
            true
        )
        returning id;
      `;
  const { recipe_id, title, body } = note;
  return await simpleQuery(sql, [recipe_id, title, body]);
};

export const updateNote = async (note: Partial<Note>) => {
  let ok = true;
  let result = null;
  let error = null;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sqlSelect = `
      select 
        id, 
        recipe_id,
        title,
        body,
        is_active  
      from 
        ${PGSCHEMA}.note
      where
        id = $1
      ;
    `;
    const valSelect = [note.id];
    const resNote = (await client.query(sqlSelect, valSelect)).rows[0];

    const sqlUpdate = `
      update 
        ${PGSCHEMA}.note
      set
        title = $2,
        body = $3,
        is_active = $4
      where 
        id = $1
      returning id;
      ;
    `;
    const valUpdate = [
      note.id,
      note.title || resNote.title,
      note.body || resNote.body,
      note.is_active || resNote.is_active,
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

export const listNote = async (noteIds: number[]) => {
  const sql = `
    select 
      id,
      note_label
    from 
      ${PGSCHEMA}.note
    where
      is_active = true
      ${noteIds?.length ? "and id in ($1)" : ""}
    ;
  `;

  const val: number[][] = [];
  if (noteIds?.length) val.push(noteIds);
  const [ok, result, error] = await simpleQuery(sql, val);
  return [ok, result, error];
};
