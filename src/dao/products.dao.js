import ProductModel from "../models/products.model.js";

export default class ProductsDao {
  getById(id) {
    return ProductModel.findById(id);
  }

  decreaseStock(id, qty) {
    return ProductModel.findByIdAndUpdate(id, { $inc: { stock: -qty } });
  }

  getAll() {
    return ProductModel.find();
  }

  create(data) {
    return ProductModel.create(data);
  }

}
