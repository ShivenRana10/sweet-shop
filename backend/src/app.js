const express = require("express");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const adminRoutes = require("./routes/admin.routes");
const sweetsRoutes = require("./routes/sweets.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sweets", sweetsRoutes);

module.exports = app;
