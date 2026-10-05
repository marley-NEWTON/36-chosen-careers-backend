const express = require("express");
const {
  register,
  login,
  getMe,
  updateMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const {
  registerValidation,
  loginValidation,
  updateMeValidation,
} = require("../middleware/validators");

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMeValidation, updateMe);

module.exports = router;
