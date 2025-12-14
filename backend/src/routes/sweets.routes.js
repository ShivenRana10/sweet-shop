const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// In-memory store
let sweets = [];
let idCounter = 1;

// ADD SWEET (ADMIN)
router.post("/", authMiddleware, adminMiddleware, (req, res) => {
  const { name, price, quantity } = req.body;

  const sweet = {
    id: idCounter++,
    name,
    price,
    quantity
  };

  sweets.push(sweet);
  res.status(201).json(sweet);
});

// GET ALL SWEETS (PUBLIC)
router.get("/", (req, res) => {
  res.status(200).json(sweets);
});

// PURCHASE SWEET (USER)
router.post("/:id/purchase", authMiddleware, (req, res) => {
  const sweet = sweets.find(s => s.id === Number(req.params.id));
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  res.status(200).json({ message: "Purchase successful", sweet });
});

// RESTOCK SWEET (ADMIN)
router.post("/:id/restock", authMiddleware, adminMiddleware, (req, res) => {
  const sweet = sweets.find(s => s.id === Number(req.params.id));
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  const { quantity } = req.body;
  sweet.quantity += quantity;

  res.status(200).json({ message: "Restocked successfully", sweet });
});

module.exports = router;
