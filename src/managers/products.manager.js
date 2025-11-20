export default class ProductsManager {
  constructor(repository) {
    this.repo = repository;
  }

  getAll() {
    return this.repo.getAll();
  }

  getById(id) {
    return this.repo.getById(id);
  }

  decreaseStock(id, qty) {
    return this.repo.decreaseStock(id, qty);
  }

  create(data) {
    return this.repo.create(data);
  }
}
