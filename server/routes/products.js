const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductsUnderCategory,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require("../controllers/products");

const router = express.Router();

router.route("/:userId").post(createProduct).get(getMyProducts);
router.route("/").get(getAllProducts);
router.route("/:category").get(getProductsUnderCategory);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;
