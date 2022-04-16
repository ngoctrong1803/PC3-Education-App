const express = require("express");
const router = express.Router();
const blogController = require("../app/controller/blogController");

router.get("/list", blogController.getBlog);
router.post("/create", blogController.createBlog);
router.put("/update/:id", blogController.updateBlog);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
