const asyncHandler = require("express-async-handler");
const { User, Ticket } = require("../model");

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({
      code: 401,
      message: "User not found",
    });
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({
      code: 401,
      message: "User not found",
    });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404).json({
      code: 404,
      message: "Ticket not found",
    });
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json({
      code: 401,
      message: "Not Authorized",
    });
  }
  res.status(200).json(ticket);
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

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({
      code: 401,
      message: "User not found",
    });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404).json({
      code: 404,
      message: "Ticket not found",
    });
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json({
      code: 401,
      message: "Not Authorized",
    });
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({
      code: 401,
      message: "User not found",
    });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404).json({
      code: 404,
      message: "Ticket not found",
    });
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json({
      code: 401,
      message: "Not Authorized",
    });
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
