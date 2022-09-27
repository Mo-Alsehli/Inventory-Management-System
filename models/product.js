const mongoose = require("mongoose");
const { UnauthenticatedError } = require("../errors/index");
require("express-async-errors");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide A Name"],
    maxlength: 20,
  },
  category: {
    type: String,
    required: [true, "Please Provide A Category"],
  },
  price: {
    type: Number,
    required: [true, "Please Provide A Price"],
  },
  count: {
    type: Number,
    default: 1,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
