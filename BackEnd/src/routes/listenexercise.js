const express = require("express");
const router = express.Router();
const listenExerciseController = require("../app/controller/listenExerciseController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", listenExerciseController.getListenExercise);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  listenExerciseController.createListenExercise
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  listenExerciseController.updateListenExercise
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  listenExerciseController.deleteListenExercise
);

module.exports = router;
