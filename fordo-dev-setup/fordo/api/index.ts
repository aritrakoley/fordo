import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import { router } from "./src/routes/routes";
import cors from "cors";

console.log({
  api_port: process.env.API_PORT,
  host: process.env.POSTGRES_HOST,
  schema: process.env.POSTGRES_SCHEMA,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

const app: Express = express();
const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("fordo-api server is running...");
});

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});
