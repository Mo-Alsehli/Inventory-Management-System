const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const bcrypt = require("bcryptjs");
require("express-async-errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
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

  if (!user) {
    throw new UnauthenticatedError("Please Provide Valid Credintials");
  }
  const isPassed = await bcrypt.compare(password, user.password);

  if (!isPassed) {
    throw new UnauthenticatedError("Please Provide Valid Credintials");
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
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

    if (!name || !email) {
      throw new BadRequestError("Email And Name Must Be Provided");
    }

    const newUser = await User.findOneAndUpdate({ _id: user_id }, req.body, {
      new: true,
      runValidators: true,
    });
    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET
    );
    res.status(StatusCodes.OK).json({ user: { name: newUser.name }, token });
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const {
      body: { oldPassword, password },
      params: { id: user_id },
    } = req;

    if (!password || !oldPassword) {
      throw new BadRequestError("Password Must Be Provided");
    }

    const user = await User.findOne({ _id: user_id });
    const isPassed = await bcrypt.compare(req.body.oldPassword, user.password);
    if (isPassed) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const isSimiler = await bcrypt.compare(req.body.password, user.password);
      if (isSimiler) {
        throw new BadRequestError("New Password Can't Be Similter To Old One");
      } else {
        const newPassword = await User.findOneAndUpdate(
          { _id: user_id },
          { password: hash },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!newPassword) {
          throw new NotFoundError(`There is no User with id: ${user_id}`);
        }
        res.status(StatusCodes.OK).send({ newPassword });
      }
    } else {
      throw new UnauthenticatedError("Please Provide Correct password");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  update,
  updatePassword,
};
