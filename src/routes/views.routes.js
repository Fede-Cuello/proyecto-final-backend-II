import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "REGISTER" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "LOGIN" });
});

router.get("/home", (req, res) => {
  res.render("home", { title: "BIENVENIDO" });
});


router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user.toObject ? req.user.toObject() : req.user;
    res.render("current", { user});
  }
);

export default router;
