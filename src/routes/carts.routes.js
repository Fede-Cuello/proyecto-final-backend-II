import { Router } from "express";
import passport from "passport";
import { checkRole } from "../middlewares/role.middleware.js";
import {
  addProductToCart,
  purchaseCart,
  createCart,
  getCartById
} from "../controllers/carts.controller.js";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRole("user"),
  createCart
);

router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  checkRole("user"),
  addProductToCart
);

router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  checkRole("user"),
  purchaseCart
);

router.get(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  checkRole("user"),
  getCartById
);

export default router;

