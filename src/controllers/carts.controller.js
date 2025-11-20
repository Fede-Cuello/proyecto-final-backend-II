import CartsManager from "../managers/carts.manager.js";
import CartsRepository from "../repository/carts.repository.js";
import ProductsRepository from "../repository/products.repository.js";
import TicketsManager from "../managers/tickets.manager.js";
import TicketsRepository from "../repository/tickets.repository.js";
import CartsDao from "../dao/carts.dao.js";
import ProductsDao from "../dao/products.dao.js";
import TicketsDao from "../dao/tickets.dao.js";

const cartsManager = new CartsManager({
  cartsRepository: new CartsRepository(new CartsDao()),
  productsRepository: new ProductsRepository(new ProductsDao()),
  ticketsManager: new TicketsManager(new TicketsRepository(new TicketsDao())),
});

export const createCart = async (req, res) => {
  try {
    const cart = await cartsManager.createCart();
    res.json({ message: "Cart created", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    await cartsManager.addProduct(cid, pid, quantity);
    res.json({ status: "success", message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { ticket, failedProducts } = await cartsManager.purchaseCart(
      req.params.cid,
      req.user.email
    );
    res.json({ status: "success", ticket, failedProducts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

