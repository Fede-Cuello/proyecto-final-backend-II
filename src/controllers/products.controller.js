import ProductsManager from "../managers/products.manager.js";
import ProductsDao from "../dao/products.dao.js";

const productsManager = new ProductsManager(new ProductsDao());

export const getProducts = async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productsManager.getById(req.params.pid);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productsManager.create(req.body);
    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
