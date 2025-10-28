import mongoose from "mongoose";

export const connectDB = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error(" Error al conectar a MongoDB:", error);
  }
};
