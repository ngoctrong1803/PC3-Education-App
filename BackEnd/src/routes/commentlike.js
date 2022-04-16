const express = require("express");
const router = express.Router();
const commentLikeController = require("../app/controller/commentLikeController");

router.get("/list", commentLikeController.getCommentLike);
router.post("/create", commentLikeController.createCommentLike);
router.put("/update/:id", commentLikeController.updateCommentLike);
router.delete("/delete/:id", commentLikeController.deleteCommentLike);

module.exports = router;
