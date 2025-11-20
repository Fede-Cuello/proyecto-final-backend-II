export default class CartsManager {
  constructor({ cartsRepository, productsRepository, ticketsManager }) {
    this.cartsRepo = cartsRepository;
    this.productsRepo = productsRepository;
    this.ticketsManager = ticketsManager;
  }

  
  createCart() {
    return this.cartsRepo.create();
  }

  
  getById(cid) {
    return this.cartsRepo.getById(cid);
  }

 
  addProduct(cid, pid, qty) {
    return this.cartsRepo.addProduct(cid, pid, qty);
  }

  
  async purchaseCart(cartId, purchaserEmail) {
    const cart = await this.cartsRepo.getById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const failedProducts = [];
    let totalAmount = 0;
    const productsToKeep = [];

    
    for (const item of cart.products) {
      const product = await this.productsRepo.getById(
        item.product._id || item.product
      );
      if (!product) {
        failedProducts.push(
          item.product._id
            ? item.product._id.toString()
            : item.product.toString()
        );
        continue;
      }

      if (product.stock >= item.quantity) {
        await this.productsRepo.decreaseStock(product._id, item.quantity);
        totalAmount += product.price * item.quantity;
      } else {
        failedProducts.push(product._id.toString());
        productsToKeep.push({ product: product._id, quantity: item.quantity });
      }
    }

    let ticket = null;
    if (totalAmount > 0) {
      ticket = await this.ticketsManager.createTicket({
        amount: totalAmount,
        purchaser: purchaserEmail,
      });
    }

    
    await this.cartsRepo.setProducts(cartId, productsToKeep);

    return { ticket, failedProducts };
  }
}
