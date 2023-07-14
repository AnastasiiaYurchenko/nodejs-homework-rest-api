const express = require("express"); //експотруємо express

const { register, login } = require("../../controllers/users");

const router = express.Router(); // створюємо роутер

//або signup
router.post("/register", register);

// або signin
router.post("/login", login);

module.exports = router; //експортуємо роутер
