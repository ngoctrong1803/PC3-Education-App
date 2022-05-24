const express = require("express");
const router = express.Router();
const statisticalOfExerController = require("../app/controller/statisticalOfExerController");

router.get("/list", statisticalOfExerController.getStatisticalOfExercise);
router.get(
  "/list-statistical-result-of-all-subject",
  statisticalOfExerController.getStatisticalResultOfAllSubject
);
router.get(
  "/list-statistical-result-of-subject/:slug",
  statisticalOfExerController.getStatisticalResultOfSubject
);
router.get(
  "/lession/:id",
  statisticalOfExerController.getStatisticalOfExerciseByLession
);
router.get(
  "/unit/:id",
  statisticalOfExerController.getStatisticalOfExerciseByUnit
);
router.get(
  "/user/:id",
  statisticalOfExerController.getStatisticalOfExerciseByUser
);
router.get(
  "/subject/:id",
  statisticalOfExerController.getStatisticalOfExerciseBySubject
);
router.post("/create", statisticalOfExerController.createStatisticalOfExercise);
router.post(
  "/by-user-and-lession",
  statisticalOfExerController.getStatisticalOfExerciseByUserAndLession
);
router.post(
  "/by-user-and-subject",
  statisticalOfExerController.getStatisticalOfExerciseByUserAndSubject
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
