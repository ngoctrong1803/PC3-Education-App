const express = require("express");
const router = express.Router();
const commentController = require("../app/controller/commentController");

router.get("/list", commentController.getComment);
router.post("/create", commentController.createComment);
router.put("/update/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
