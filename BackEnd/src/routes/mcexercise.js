const express = require("express");
const router = express.Router();
const mcExerciseController = require("../app/controller/mcExerciseController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list-mcexercise", mcExerciseController.getMCExercise);
router.get("/list/:id", mcExerciseController.getMCExerciseOfLession);
router.post("/list/:id", mcExerciseController.getMCExerciseOfLessionPagination);
router.get(
  "/mcexercise-by-lession/:id",
  mcExerciseController.getMCExerciseOfLession
);
router.get("/detail/:id", mcExerciseController.getMCExerciseByID);

router.post(
  "/create",
  authMiddleware.checkTeacher,
  mcExerciseController.createMCExercise
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  mcExerciseController.updateMCExercise
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  mcExerciseController.deleteMCExercise
);

module.exports = router;
