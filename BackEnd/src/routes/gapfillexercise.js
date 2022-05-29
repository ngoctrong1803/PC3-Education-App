const express = require("express");
const router = express.Router();
const gapFillExerciseController = require("../app/controller/gapFillExerciseController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", gapFillExerciseController.getGapFillingExercise);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  gapFillExerciseController.createGapFillingExercise
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  gapFillExerciseController.updateGapFillingExercise
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  gapFillExerciseController.deleteGapFillingExercise
);

module.exports = router;
