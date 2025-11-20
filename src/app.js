import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import { __dirname, join } from "./utils/index.js";
import userRoutes from "./routes/sessions.routes.js";
import viewRoutes from "./routes/views.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import productsRoutes from "./routes/products.routes.js"
import ticketsRoutes from "./routes/tickets.routes.js"
import initializePassport from "./config/passport.config.js";
import { connectDB } from "./config/db.js";
import envs from "./config/envs.js";


const app = express();
const PORT = envs.port;
const MONGO_URL =envs.mongo_url;

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
app.use("/api/carts", cartsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/", viewRoutes);



// Conexion a MongoDB
connectDB(envs.mongo_url);

// Servidor 
app.listen(PORT, () => {
  console.log(`Servidor conectado en puerto ${PORT}`);
});
