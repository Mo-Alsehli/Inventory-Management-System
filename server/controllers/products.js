const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/index");
require("express-async-errors");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort("price");
    res.status(StatusCodes.OK).json({ products, count: products.length });
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  const createdBy = req.params.userId;
  const myproduct = { ...req.body, createdBy };
  try {
    const product = await Product.create(myproduct);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    console.log(error);
  }
};

const getMyProducts = async (req, res) => {
  try {
    const user_id = req.params.userId;
    console.log(user_id);
    const products = await Product.find({
      createdBy: user_id,
    });
    if (!products) {
      throw new NotFoundError(`There Is No Users With Id: ${user_id}`);
    }
    res.status(StatusCodes.OK).json({ products, count: products.length });
  } catch (error) {
    console.log(error);
  }
};

const getProductsUnderCategory = async (req, res) => {
  try {
    const {
      params: { category },
    } = req;
    const products = await Product.find({
      category,
    });
    if (!products) {
      throw new NotFoundError(
        `There Is No Products With Under Category: ${category}`
      );
    }
    res.status(StatusCodes.OK).json({ products, count: products.length });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      body: { name, price, category },
      params: { id: productId },
    } = req;

    if (!name || !price || !category) {
      throw new BadRequestError("Please Provide Required Data");
    }

    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      {
        runValidators: true,
      }
    );

    if (!product) {
      throw new NotFoundError(`There is no Product with id: ${product}`);
    }

    res.status(StatusCodes.OK).send({ product });
  } catch (error) {}
};
const deleteProduct = async (req, res) => {
  const {
    params: { id: productId },
  } = req;

  await Product.findOneAndDelete({ _id: productId });

  res.status(StatusCodes.OK).json({ msg: "Product Was Deleted Successful" });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductsUnderCategory,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
