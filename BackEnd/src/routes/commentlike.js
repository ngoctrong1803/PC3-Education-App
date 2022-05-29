const express = require("express");
const router = express.Router();
const commentLikeController = require("../app/controller/commentLikeController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", commentLikeController.getCommentLike);
router.post(
  "/create",
  authMiddleware.verifyToken,
  commentLikeController.createCommentLike
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  commentLikeController.updateCommentLike
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  commentLikeController.deleteCommentLike
);

module.exports = router;
