const express = require("express");
const router = express.Router();
const cateBlogController = require("../app/controller/cateBlogController");

router.get("/list", cateBlogController.getCateBlog);
router.post("/create", cateBlogController.createCateBlog);
router.put("/update/:id", cateBlogController.updateCateBlog);
router.delete("/delete/:id", cateBlogController.deleteCateBlog);

module.exports = router;
