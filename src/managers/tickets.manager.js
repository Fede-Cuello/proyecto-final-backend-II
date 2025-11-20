export default class TicketsManager {
  constructor(repository) {
    this.repo = repository;
  }

  createTicket(data) {
    return this.repo.create(data);
  }

  getTicketByCode(code) {
    return this.repo.getByCode(code);
  }
}
