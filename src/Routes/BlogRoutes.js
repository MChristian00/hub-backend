import { Router } from "express";
import Validator from "../Middleware/Validation/BlogsValidation";
import {
  allBlogs,
  oneBlog,
  userBlogs,
  addBlog,
  deleteBlog,
  addComment,
  viewBlog,
  favBlog,
  likeBlog,
} from "../Controllers/BlogsControllers";

const router = Router();

router.get("/", allBlogs);

router.get("/:id", oneBlog);

router.get("/user/:id", userBlogs);

router.post("/add", addBlog);

// router.put("/:id", BlogControllers.updateBlog);

router.delete("/:id", deleteBlog);

router.put("/comment", addComment);

router.put("/view/:ID", viewBlog);

router.put("/fav", favBlog);

router.put("/like", likeBlog);

export default router;
