const express = require("express");
const router = express.Router();
const gapFillExerciseController = require("../app/controller/gapFillExerciseController");

router.get("/list", gapFillExerciseController.getGapFillingExercise);
router.post("/create", gapFillExerciseController.createGapFillingExercise);
router.put("/update/:id", gapFillExerciseController.updateGapFillingExercise);
router.delete(
  "/delete/:id",
  gapFillExerciseController.deleteGapFillingExercise
);

module.exports = router;
