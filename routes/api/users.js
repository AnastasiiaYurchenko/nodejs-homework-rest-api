const express = require("express"); //експотруємо express

const { register } = require("../../controllers/users");

const router = express.Router(); // створюємо роутер

//або signup
router.post("/register", register);

module.exports = router; //експортуємо роутер
