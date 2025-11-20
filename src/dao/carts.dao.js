import CartModel from "../models/carts.model.js";

export default class CartsDao {
  create() {
    return CartModel.create({ products: [] });
  }

  getById(id) {
    return CartModel.findById(id).populate("products.product");
  }

  addProduct(cid, pid, qty) {
    return CartModel.findByIdAndUpdate(
      cid,
      { $push: { products: { product: pid, quantity: qty } } },
      { new: true }
    );
  }

  setProducts(cid, products) {
    return CartModel.findByIdAndUpdate(cid, { products }, { new: true });
  }
}
