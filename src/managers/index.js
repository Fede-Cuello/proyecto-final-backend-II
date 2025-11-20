// src/managers/index.js
import CartsManager from "./carts.manager.js";
import ProductsManager from "./products.manager.js";
import TicketsManager from "./tickets.manager.js";

import CartsRepository from "../repository/carts.repository.js";
import CartsDao from "../dao/carts.dao.js";

import ProductsRepository from "../repository/products.repository.js";
import ProductsDao from "../dao/products.dao.js";

import TicketsRepository from "../repository/tickets.repository.js";
import TicketsDao from "../dao/tickets.dao.js";

// --- DAO ---
const cartsDao = new CartsDao();
const productsDao = new ProductsDao();
const ticketsDao = new TicketsDao();

// --- REPOSITORY ---
const cartsRepository = new CartsRepository(cartsDao);
const productsRepository = new ProductsRepository(productsDao);
const ticketsRepository = new TicketsRepository(ticketsDao);

// --- MANAGERS ---
const ticketsManager = new TicketsManager(ticketsRepository);
const productsManager = new ProductsManager(productsRepository);

const cartsManager = new CartsManager({
  cartsRepository,
  productsRepository,
  ticketsManager,
});

export { cartsManager, productsManager, ticketsManager };
