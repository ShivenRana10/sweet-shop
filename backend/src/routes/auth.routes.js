const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", (req, res) => {
  res.status(201).json({ message: "User registered" });
});

router.post("/login", (req, res) => {
  const { email } = req.body;

  // simple role logic for demo
  const role = email === "admin@test.com" ? "admin" : "user";

  const token = jwt.sign(
    { id: "user123", role },
    "secret"
  );

  res.status(200).json({ token });
});

module.exports = router;
