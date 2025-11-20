import { Router } from "express";
import passport from "passport";
import { checkRole } from "../middlewares/role.middleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/products.controller.js";

const router = Router();


router.get("/", getProducts);
router.get("/:pid", getProductById);


router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  createProduct
);


export default router;
