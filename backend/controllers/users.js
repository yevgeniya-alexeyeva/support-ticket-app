const asyncHandler = require("express-async-handler");
const { User } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Please include all fields",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid user data",
    });
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });

      console.log(
        "🚀 ~ file: users.js ~ line 66 ~ loginUser ~ password",
        password,
        user.password
      );
    } else {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      });
    }
  } catch (error) {
    next(error);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "logout user" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
