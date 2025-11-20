export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getById(id) {
    return this.dao.getById(id);
  }

  decreaseStock(id, qty) {
    return this.dao.decreaseStock(id, qty);
  }

  getAll() {
    return this.dao.getAll();
  }
}
