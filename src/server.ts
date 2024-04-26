import express from "express";
import { Request, Response } from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

// global middleware
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello World!" });
});

app.use("/api", router);

export default app;
