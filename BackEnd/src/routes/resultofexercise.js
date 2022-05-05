const express = require("express");
const router = express.Router();
const resultOfExerController = require("../app/controller/resultOfExerController");

router.get("/list", resultOfExerController.getResultOfExercise);
router.get("/:id", resultOfExerController.getResultOfExerciseByStatisticalID);
router.post("/create", resultOfExerController.createResultOfExercise);
router.put("/update/:id", resultOfExerController.updateResultOfExercise);
router.delete("/delete/:id", resultOfExerController.deleteResultOfExercise);

module.exports = router;
