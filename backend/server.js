const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { userRouter } = require("./routes");
const { errorHandler } = require("./middleware");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
