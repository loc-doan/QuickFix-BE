const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const {authenticate,authorizePosition} = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/login",
  authController.login,
);


module.exports = router;