const express = require("express");
const router = express.Router();
const statisticalOfExerController = require("../app/controller/statisticalOfExerController");

router.get("/list", statisticalOfExerController.getStatisticalOfExercise);
router.get(
  "/lession/:id",
  statisticalOfExerController.getStatisticalOfExerciseByLession
);
router.get(
  "/unit/:id",
  statisticalOfExerController.getStatisticalOfExerciseByUnit
);
router.post("/create", statisticalOfExerController.createStatisticalOfExercise);
router.post(
  "/by-user-and-lession",
  statisticalOfExerController.getStatisticalOfExerciseByUserAndLession
);
router.post(
  "/delete/by-user-and-lession",
  statisticalOfExerController.deleteStatisticalOfExerciseByUserAndLession
);
router.put(
  "/update/:id",
  statisticalOfExerController.updateStatisticalOfExercise
);
router.delete(
  "/delete/:id",
  statisticalOfExerController.deleteStatisticalOfExercise
);

module.exports = router;
