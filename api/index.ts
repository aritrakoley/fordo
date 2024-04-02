import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import { router } from "./src/routes/routes";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("fordo-api server is running...");
});

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});
