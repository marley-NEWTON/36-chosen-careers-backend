const express = require("express");
const {
  generateSummary,
  suggestSkills,
  improveExperience,
  generateCoverLetter,
} = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/summary", protect, generateSummary);
router.post("/skills", protect, suggestSkills);
router.post("/experience", protect, improveExperience);
router.post("/cover-letter", protect, generateCoverLetter);

module.exports = router;
