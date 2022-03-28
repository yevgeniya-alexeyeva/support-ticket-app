const { router: userRouter } = require("./users");
const { router: ticketsRouter } = require("./tickets");
const { router: notesRouter } = require("./notes");

module.exports = {
  userRouter,
  ticketsRouter,
};
