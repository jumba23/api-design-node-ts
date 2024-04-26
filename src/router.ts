import { Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

/**
 * Product routes
 */

router.get("/product", (req, res) => {
  res.json({ message: "Hello World" });
});
router.get("/product/:id", () => {});
router.post("/product", () => {});
router.put("/product/:id", body('name'), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});
router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post("/update", () => {});
router.put("/update/:id", () => {});
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
