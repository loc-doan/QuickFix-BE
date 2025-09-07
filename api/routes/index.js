const express = require("express");
const authRoutes = require("./auth.routes");
const router = express.Router();
const {authenticate,authorizePosition} = require("../middlewares/auth");
// Health check specific to API
router.get("/hello", (req, res) => {
  res.status(200).json({ message: "API is running" });
});
router.get("/protect",authenticate, authorizePosition("admin"),(req, res) => {
  res.status(200).json({ message: "API is protect for admin" });
});
// Mount routes
router.use("/auth", authRoutes);

module.exports = router;
