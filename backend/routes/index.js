const { router: userRouter } = require("./users");
const { router: ticketsRouter } = require("./tickets");

module.exports = {
  userRouter,
  ticketsRouter,
};
