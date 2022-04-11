const express = require("express");
const router = express.Router();
const mcExerciseController = require("../app/controller/mcExerciseController");

router.get("/list-mcexercise", mcExerciseController.getMCExercise);
router.post("/create", mcExerciseController.createMCExercise);
router.put("/update/:id", mcExerciseController.updateMCExercise);
router.delete("/delete/:id", mcExerciseController.deleteMCExercise);

module.exports = router;
