import { Router } from "express";
import { body, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product routes
 */

router.get("/product", (req, res) => {
  res.json({ message: "Hello World" });
});
router.get("/product/:id", () => {});
router.post(
  "/product",
  // middleware
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post("/update", () => {});
router.put(
  "/update/:id",
  body("title").optional,
  body("body").optional,
  oneOf([body("IN_PROGRESS"), body("SHIPPED"), body("DEPRECATED")]),
  body("version").optional,

  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.put("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
