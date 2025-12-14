const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({ message: "User registered successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
