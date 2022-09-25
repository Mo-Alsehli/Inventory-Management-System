const express = require("express");
const {
  login,
  register,
  update,
  updatePassword,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update/:id", update);
router.patch("/updatePassword/:id", updatePassword);

module.exports = router;
