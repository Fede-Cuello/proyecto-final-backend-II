import { Router } from "express";
import passport from "passport";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  createTicket,
  getTicketByCode,
} from "../controllers/tickets.controller.js";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  allowRoles("user"),
  createTicket
);

router.get(
  "/:code",
  passport.authenticate("jwt", { session: false }),
  allowRoles("user"),
  getTicketByCode
);

export default router;
