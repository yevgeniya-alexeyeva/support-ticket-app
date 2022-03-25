const asyncHandler = require("express-async-handler");
const { User, Ticket } = require("../model");

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).json({
      code: 400,
      message: "User not found",
    });
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400).json({
      code: 400,
      message: "Please add a product and description",
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400).json({
      code: 400,
      message: "User not found",
    });
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};
