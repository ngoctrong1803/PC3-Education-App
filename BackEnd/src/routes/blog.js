const express = require("express");
const router = express.Router();
const blogController = require("../app/controller/blogController");

router.get("/list", blogController.getBlog);
router.post("/list", blogController.getBlogPagination);
router.get("/list-index", blogController.getBlogInForumIndex);
router.get("/list-blog-index", blogController.getListBlogInForumIndex);
router.get("/:id", blogController.getBlogById);
router.post("/create", blogController.createBlog);
router.put("/update/:id", blogController.updateBlog);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
