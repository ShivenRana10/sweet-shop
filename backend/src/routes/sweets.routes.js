const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// In-memory sweet store (temporary)
let sweets = [];
let idCounter = 1;

// ADD SWEET (ADMIN ONLY)
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

// UPDATE SWEET (ADMIN ONLY)
router.put("/:id", authMiddleware, adminMiddleware, (req, res) => {
  const sweet = sweets.find(s => s.id === Number(req.params.id));
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });

  Object.assign(sweet, req.body);
  res.status(200).json(sweet);
});

// DELETE SWEET (ADMIN ONLY)
router.delete("/:id", authMiddleware, adminMiddleware, (req, res) => {
  sweets = sweets.filter(s => s.id !== Number(req.params.id));
  res.status(200).json({ message: "Sweet deleted" });
});

module.exports = router;
