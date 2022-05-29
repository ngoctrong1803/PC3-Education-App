const express = require("express");
const router = express.Router();
const commentController = require("../app/controller/commentController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", commentController.getComment);
router.post(
  "/create",
  authMiddleware.verifyToken,
  commentController.createComment
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  commentController.updateComment
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  commentController.deleteComment
);

module.exports = router;
