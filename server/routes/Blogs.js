const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const { body, validationResult } = require("express-validator");
const { Blog } = require("../models");
const { User } = require("../models");

const router = express.Router();

// Blog Page Access
router.get("/", authMiddleware, async (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
    username: req.username,
  });
});

// Get All Blogs
router.get("/getBlogs", authMiddleware, async (req, res) => {
  const listOfBlogs = await Blog.findAll({
    order: [["id", "DESC"]],
  });
  res.json(listOfBlogs);
});

// Get All Blogs based on UserId
// TODO: ADD FUNCTION

// Get a Blog based on Id
router.get("/getBlog", authMiddleware, async (req, res) => {
  const blogId = req.query.id;
  const currentBlog = await Blog.findOne({ where: { id: blogId } });
  res.json(currentBlog);
});

// Update a Blog based on Id
router.post(
  "/updateBlog",
  [
    body("id").not().isEmpty().isNumeric().withMessage("Invalid blogId"),
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 10 })
      .withMessage("Title must be at least 10 characters long"),
    body("context")
      .not()
      .isEmpty()
      .withMessage("Context is required")
      .isLength({ min: 10 })
      .withMessage("Context must be at least 10 characters long"),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation failed", error: errors.array()[0].msg });
      }

      // Check if blog exists
      const oldBlog = await Blog.findOne({ where: { id: req.body.id } });
      if (!oldBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Check if user is authorized to update blog
      if (oldBlog.userId !== req.userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this blog" });
      }

      // Update blog
      oldBlog.title = req.body.title;
      oldBlog.context = req.body.context;
      await oldBlog.save();

      // Return success message
      res.status(200).json({
        message: "Blog updated successfully!",
      });
    } catch (error) {
      res.json({
        message: "Failed to update blog",
        error: error,
      });
    }
  }
);

// Delete a Blog based on Id
router.post(
  "/deleteBlog",
  [body("id").not().isEmpty().isNumeric().withMessage("Invalid blogId")],
  authMiddleware,
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", error: errors.array()[0].msg });
    }

    // Check if blog exists
    const blog = await Blog.findOne({ where: { id: req.body.id } });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user is authorized to delete blog
    if (blog.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }

    // Delete blog
    await blog.destroy();

    // Return success message
    res.status(200).json({
      message: "Blog deleted successfully!",
    });
    try {
    } catch (error) {
      res.json({
        message: "Failed to create blog",
        error: error.errors[0].message,
      });
    }
  }
);

// Create a Blog
router.post(
  "/createBlog",
  authMiddleware,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 10 })
      .withMessage("Title must be at least 10 characters long"),
    body("context")
      .not()
      .isEmpty()
      .withMessage("Context is required")
      .isLength({ min: 10 })
      .withMessage("Context must be at least 10 characters long"),
    body("userId").not().isEmpty().isNumeric().withMessage("Invalid UserId"),
    body("author")
      .not()
      .isEmpty()
      .withMessage("Author is required")
      .isLength({ min: 3 })
      .withMessage("Author must be at least 3 characters long"),
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

      // Check if userId or author already exists
      if (!(await User.findOne({ where: { id: req.body.userId } }))) {
        return res.status(400).json({
          message: "Validation failed",
          error: "Invalid User Id",
        });
      }

      if (!(await User.findOne({ where: { username: req.body.author } }))) {
        return res.status(400).json({
          message: "Validation failed",
          error: "Invalid Author",
        });
      }

      // Create blog
      const currentBlog = await Blog.create(req.body);
      if (!currentBlog) {
        return res.status(400).json({
          message: "Failed to create blog",
        });
      }

      // Return success message
      res.status(200).json({
        message: "Blog created successfully!",
      });
    } catch (error) {
      res.json({
        message: "Failed to create blog",
        error: error.errors[0].message,
      });
    }
  }
);

module.exports = router;
