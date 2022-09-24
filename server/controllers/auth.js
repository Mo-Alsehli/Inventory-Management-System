const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const bcrypt = require("bcryptjs");
require("express-async-errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  req.user = user;
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET
  );
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email And Password");
  }

  const user = await User.findOne({ email });
  req.user = user;
  console.log("when login");
  console.log(req.user);

  console.log(user);
  if (!user) {
    throw new UnauthenticatedError("Please Provide Valid Credintials");
  }
  const isPassed = await bcrypt.compare(password, user.password);

  if (!isPassed) {
    throw new UnauthenticatedError("Please Provide Valid Credintials");
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET
  );
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const update = async (req, res) => {
  try {
    const {
      body: { name, email },
      params: { id: user_id },
    } = req;

    console.log("when update");
    console.log(req.user);

    if (!name || !email) {
      throw new BadRequestError("Company And Position Must Be Provided");
    }

    const newUser = await User.findOneAndUpdate({ _id: user_id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newUser) {
      throw new NotFoundError(`There is no job with id: ${user_id}`);
    }

    res.status(StatusCodes.OK).send({ newUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  update,
};
