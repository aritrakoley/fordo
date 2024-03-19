import { Pool, QueryResult } from "pg";
import { config } from "../configs/fordo-db.config";

const pool = new Pool(config);

export const simpleQuery = async (text: string, params?: any) => {
  let result = null;
  let ok = true;
  let error = null;
  try {
    const res = await pool.query(text, params);
    result = res?.rows ?? null;
  } catch (err) {
    console.log(err);
    ok = false;
    error = err;
  }

  return [ok, result, error];
};
