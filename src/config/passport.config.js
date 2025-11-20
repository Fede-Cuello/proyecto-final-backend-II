import passport from "passport";
import local from "passport-local";
import UserModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils/index.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import envs from "./envs.js";

const LocalStrategy = local.Strategy;
const ExtractJWT = ExtractJwt;
const JWT_SECRET = envs.jwt_secret;




const initializePassport = () => {

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, role } = req.body;
          const userFound = await UserModel.findOne({ email: username });

          if (userFound) {
            console.log("Usuario ya existente en la base de datos");
            return done(null, false);
          }

          const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            role: role || "user",
            password: createHash(password),
            
          });

          return done(null, newUser);
        } catch (error) {
          return done(`Error al crear el usuario: ${error}`, false);
        }
      }
    )
  );

  
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });
          if (!user)
            return done(null, false, { message: "Usuario no encontrado" });

          const isValid = isValidPassword(password, user.password);
          if (!isValid)
            return done(null, false, { message: "Contraseña incorrecta" });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          const user = await UserModel.findById(jwt_payload.user.id);
          if (!user) { 
            console.log("Usuario no encontrado");
            return done(null, false);
          } 
           console.log("Usuario autenticado:", user);
          return done(null, user);
        } catch (error) {
          console.log("Error en JWT", error);
          return done(error, false);
        }
      }
    )
  );

  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }
  return token;
};

export default initializePassport;
