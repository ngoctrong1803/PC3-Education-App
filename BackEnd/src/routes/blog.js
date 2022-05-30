const express = require("express");
const router = express.Router();
const blogController = require("../app/controller/blogController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", blogController.getBlog);
router.post(
  "/list-in-forum-index",
  blogController.getBlogPaginationInForumIndex
);
router.post("/list", blogController.getBlogPagination);
router.get("/list-index", blogController.getBlogInForumIndex);
router.get("/list-blog-index", blogController.getListBlogInForumIndex);
router.get("/:id", blogController.getBlogById);
router.post("/create", authMiddleware.checkAdmin, blogController.createBlog);
router.put("/update/:id", authMiddleware.checkAdmin, blogController.updateBlog);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  blogController.deleteBlog
);

module.exports = router;
