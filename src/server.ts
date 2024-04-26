import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";

const app = express();

// global middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello World!" });
});

app.use("/api", protect, router);

export default app;
