import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const JWT_SECRET = "federico";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))


export const isValidPassword = (password, hash) =>
    bcrypt.compareSync(password, hash)

export const generateToken = (user) =>
    jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });

export { join, __dirname ,JWT_SECRET};