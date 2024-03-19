import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./src/routes/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("fordo server is working");
});

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});
