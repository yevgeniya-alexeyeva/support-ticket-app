const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./config/db");
const { userRouter, ticketsRouter } = require("./routes");
const { errorHandler } = require("./middleware");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/ticket", ticketsRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
