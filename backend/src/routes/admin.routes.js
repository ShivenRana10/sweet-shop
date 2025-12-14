const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Admin dashboard access" });
});

module.exports = router;
