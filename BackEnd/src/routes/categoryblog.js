const express = require("express");
const router = express.Router();
const cateBlogController = require("../app/controller/cateBlogController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", cateBlogController.getCateBlog);
router.post(
  "/create",
  authMiddleware.checkAdmin,
  cateBlogController.createCateBlog
);
router.put(
  "/update/:id",
  authMiddleware.checkAdmin,
  cateBlogController.updateCateBlog
);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  cateBlogController.deleteCateBlog
);

module.exports = router;
