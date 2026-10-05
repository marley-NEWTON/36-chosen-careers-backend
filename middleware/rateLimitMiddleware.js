const rateLimit = require("express-rate-limit");

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 AI requests per user per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => (req.user ? req.user._id.toString() : req.ip),
  message: {
    message: "Too many AI requests. Please wait a few minutes and try again.",
  },
});

module.exports = { aiLimiter };
