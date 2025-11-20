import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  stock: Number,
});

export default mongoose.model("Product", productSchema);
