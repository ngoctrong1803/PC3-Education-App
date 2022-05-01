const express = require("express");
const router = express.Router();
const mcExerciseController = require("../app/controller/mcExerciseController");

router.get("/list-mcexercise", mcExerciseController.getMCExercise);
router.get("/list/:id", mcExerciseController.getMCExerciseOfLession);
router.get(
  "/mcexercise-by-lession/:id",
  mcExerciseController.getMCExerciseOfLession
);
router.get("/detail/:id", mcExerciseController.getMCExerciseByID);
router.post("/create", mcExerciseController.createMCExercise);
router.put("/update/:id", mcExerciseController.updateMCExercise);
router.delete("/delete/:id", mcExerciseController.deleteMCExercise);

module.exports = router;
