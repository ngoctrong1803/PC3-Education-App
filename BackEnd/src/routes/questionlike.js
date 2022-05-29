const express = require("express");
const router = express.Router();
const questionLikeController = require("../app/controller/questionLikeController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", questionLikeController.getQuestionLike);
router.post(
  "/create",
  authMiddleware.verifyToken,
  questionLikeController.createQuestionLike
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  questionLikeController.updateQuestionLike
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  questionLikeController.deleteQuestionLike
);

module.exports = router;
