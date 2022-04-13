const express = require("express");
const router = express.Router();
const listenExerciseController = require("../app/controller/listenExerciseController");

router.get("/list", listenExerciseController.getListenExercise);
router.post("/create", listenExerciseController.createListenExercise);
router.put("/update/:id", listenExerciseController.updateListenExercise);
router.delete("/delete/:id", listenExerciseController.deleteListenExercise);

module.exports = router;
