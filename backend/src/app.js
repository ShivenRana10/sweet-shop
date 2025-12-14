const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/auth/login", (req, res) => {
  res.status(200).json({ token: "fake-jwt-token" });
});

module.exports = app;
