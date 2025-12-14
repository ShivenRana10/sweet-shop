const express = require("express");
const router = express.Router();
const Sweet = require("../models/sweet.model");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// ADD SWEET (ADMIN)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
});

// GET ALL SWEETS
router.get("/", async (req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
});

// PURCHASE SWEET
router.post("/:id/purchase", authMiddleware, async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.status(200).json({ message: "Purchase successful", sweet });
});

// RESTOCK SWEET (ADMIN)
router.post("/:id/restock", authMiddleware, adminMiddleware, async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  sweet.quantity += req.body.quantity;
  await sweet.save();

  res.status(200).json({ message: "Restocked successfully", sweet });
});

module.exports = router;
