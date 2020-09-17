const express = require("express");
const Validator = require("../Middleware/Validation/BlogsValidation");
const BlogControllers = require("../Controllers/BlogsControllers");

const router = express.Router();

router.get("/", BlogControllers.allBlogs);

router.get("/:id", BlogControllers.oneBlog);

router.get("/user/:id", BlogControllers.userBlogs);

router.post("/add", BlogControllers.addBlog);

// router.put("/:id", BlogControllers.updateBlog);

router.delete("/:id", BlogControllers.deleteBlog);

router.put("/comment", BlogControllers.addComment);

router.put("/view/:ID", BlogControllers.viewBlog);

router.put("/fav", BlogControllers.favBlog);

router.put("/like", BlogControllers.likeBlog);

module.exports = router;