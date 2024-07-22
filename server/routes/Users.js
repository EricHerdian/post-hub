const bcrypt = require("bcrypt");
const express = require("express");
const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const saltRounds = 10;

// Get all Users
router.get("/", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findAll();
    res.json(currentUser);
  } catch (error) {
    res.json({
      message: "Failed to get users",
      error: error.errors[0].message,
    });
  }
});

// Create User
router.post(
  "/createUser",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email format"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation failed", error: errors.array()[0].msg });
      }

      // Check if username or email already exists
      if (await User.findOne({ where: { username: req.body.username } })) {
        return res.status(400).json({
          message: "Validation failed",
          error: "Username already exists",
        });
      }

      if (await User.findOne({ where: { email: req.body.email } })) {
        return res.status(400).json({
          message: "Validation failed",
          error: "Email already exists",
        });
      }

      // Create user
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const currentUser = {
        username,
        email,
        password: hashedPassword,
      };
      await User.create(currentUser);

      // Return success message
      res.status(200).json({ message: "User created!" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
        error: error.message,
      });
    }
  }
);

module.exports = router;
