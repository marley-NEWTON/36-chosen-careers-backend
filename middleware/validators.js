const { body, validationResult } = require("express-validator");
const services = require("../data/services");

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const registerValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email")
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidation,
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
];

const orderValidation = [
  body("serviceId")
    .isIn(Object.keys(services))
    .withMessage("Invalid service selected"),
  handleValidation,
];

const updateMeValidation = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  handleValidation,
];

module.exports = {
  registerValidation,
  loginValidation,
  orderValidation,
  updateMeValidation,
};
