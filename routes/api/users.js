const express = require("express"); //експотруємо express

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers/users");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router(); // створюємо роутер

//або signup
router.post("/register", register);

router.get("/verify/:verificationToken", verify);

router.post("/verify", resendVerifyEmail);

// або signin
router.post("/login", login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router; //експортуємо роутер
