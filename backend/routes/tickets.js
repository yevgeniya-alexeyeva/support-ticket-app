const router = require("express").Router();
const { protect } = require("../middleware");

const { getTickets, createTicket } = require("../controllers/tickets");

router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = { router };
