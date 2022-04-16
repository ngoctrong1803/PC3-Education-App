const express = require("express");
const router = express.Router();
const questionLikeController = require("../app/controller/questionLikeController");

router.get("/list", questionLikeController.getQuestionLike);
router.post("/create", questionLikeController.createQuestionLike);
router.put("/update/:id", questionLikeController.updateQuestionLike);
router.delete("/delete/:id", questionLikeController.deleteQuestionLike);

module.exports = router;
