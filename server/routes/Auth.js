const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/config");

const router = express.Router();

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const currentUser = await User.findOne({ where: { email } });
    if (!currentUser) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordValid) {
      // Invalid password
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: currentUser.id, username: currentUser.username },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    // Password is valid and send jwt token
    res.status(200).json({ message: "User logged in!", token });
  } catch (error) {
    res.status(500).json({
      message: "Failed to login user",
      error: error.message,
    });
  }
});

module.exports = router;
