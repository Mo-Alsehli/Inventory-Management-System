const mongoose = require("mongoose");
const { UnauthenticatedError } = require("../errors/index");
require("express-async-errors");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide A Name"],
    minlength: 6,
    maxlength: 50,
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
});

module.exports = mongoose.model("Product", ProductSchema);
