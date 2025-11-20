import { Router } from "express";
import passport from "passport";
import UserModel from "../models/users.model.js";
import { createHash, isValidPassword ,generateToken} from "../utils/index.js";
import UserDTO from "../dto/user.dto.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age, role } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "El correo ya existe" });

    const hashedPassword = createHash(password);
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      role: role || "user" ,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });


    const isValid = isValidPassword(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const userPayload = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      };
      
    const token = generateToken(userPayload);

    res.cookie("authCookie", token, {
      httpOnly: true,
      maxAge: 3600000
    });

    res.json({
      message: "Login exitoso",
      token,
      user:userPayload
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const safeUser = new UserDTO(req.user);
    res.json({ status: "success", user: safeUser });
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("authCookie");
  res.json({ message: "Sesion cerrada" });
});



export default router;
