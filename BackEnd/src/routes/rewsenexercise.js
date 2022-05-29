const express = require("express");
const router = express.Router();
const rewSenExeController = require("../app/controller/rewSenExeController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", rewSenExeController.getRewriteSentencesExercise);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  rewSenExeController.createRewriteSentencesExercise
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  rewSenExeController.updateRewriteSentencesExercise
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  rewSenExeController.deleteRewriteSentencesExercise
);

module.exports = router;
