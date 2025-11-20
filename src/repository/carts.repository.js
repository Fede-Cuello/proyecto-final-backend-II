export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create() {
    return this.dao.create();
  }

  getById(cid) {
    return this.dao.getById(cid);
  }

  addProduct(cid, pid, qty) {
    return this.dao.addProduct(cid, pid, qty);
  }

  setProducts(cid, products) {
    return this.dao.setProducts(cid, products);
  }
}
