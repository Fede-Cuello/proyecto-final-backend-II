import TicketModel from "../models/tickets.model.js";

export default class TicketsDao {
  create(data) {
    return TicketModel.create(data);
  }

  getByCode(code) {
    return TicketModel.findOne({ code });
  }
}
