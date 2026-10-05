const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderDraft,
  deleteOrder,
  getAllOrders,
  uploadCompletedFile,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { orderValidation } = require("../middleware/validators");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", protect, orderValidation, createOrder);
router.get("/", protect, getMyOrders);
router.get("/all", protect, adminOnly, getAllOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id/draft", protect, updateOrderDraft);
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);
router.post(
  "/:id/upload",
  protect,
  adminOnly,
  upload.single("file"),
  uploadCompletedFile,
);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
