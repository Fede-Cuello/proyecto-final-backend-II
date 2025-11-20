import { cartsManager, ticketsManager } from "../managers/index.js";

export const createTicket = async (req, res) => {
  try {
    const { cartId } = req.body;
    const purchaserEmail = req.user.email;

    const { ticket, failedProducts } = await cartsManager.purchaseCart(
      cartId,
      purchaserEmail
    );

    res.json({ ticket, failedProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTicketByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const ticket = await ticketsManager.getTicketByCode(code);
    if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
