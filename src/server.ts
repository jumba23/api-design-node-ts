import express from "express";
// import { Router } from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

// global middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello World!" });
});

app.use("/api", router);

export default app;
