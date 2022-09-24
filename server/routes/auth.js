const express = require("express");
const { login, register, update } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update/:id", update);

module.exports = router;
