import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import { __dirname, join } from "./utils/index.js";
import userRoutes from "./routes/sessions.routes.js";
import viewRoutes from "./routes/views.routes.js";
import initializePassport from "./config/passport.config.js";
import { connectDB } from "./config/db.js";


const app = express();
const PORT = 3000;
const MONGO_URL =
  "mongodb+srv://fedecuello:codercoder@cluster0.bakiwgn.mongodb.net/users?retryWrites=true&w=majority";

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "../views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas 
app.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

app.use("/api/sessions", userRoutes);
app.use("/", viewRoutes);

// Conexion a MongoDB
connectDB(MONGO_URL);

// Servidor 
app.listen(PORT, () => {
  console.log(`Servidor conectado en puerto ${PORT}`);
});
