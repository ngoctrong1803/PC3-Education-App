const express = require("express");
const router = express.Router();
const statisticalOfExerController = require("../app/controller/statisticalOfExerController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", statisticalOfExerController.getStatisticalOfExercise);
router.get(
  "/list-statistical-result-of-all-subject",
  statisticalOfExerController.getStatisticalResultOfAllSubject
);
router.get(
  "/list-statistical-result-of-subject/:slug",
  statisticalOfExerController.getStatisticalResultOfSubject
);
router.post(
  "/lession/:id",
  statisticalOfExerController.getStatisticalOfExerciseByLession
);
router.post(
  "/unit/:id",
  statisticalOfExerController.getStatisticalOfExerciseByUnit
);
router.get(
  "/user/:id",
  statisticalOfExerController.getStatisticalOfExerciseByUser
);
router.post(
  "/subject/:id",
  statisticalOfExerController.getStatisticalOfExerciseBySubject
);

router.post(
  "/by-user-and-lession",
  statisticalOfExerController.getStatisticalOfExerciseByUserAndLession
);
router.post(
  "/by-user-and-subject",
  statisticalOfExerController.getStatisticalOfExerciseByUserAndSubject
);
// check
router.post(
  "/create",
  authMiddleware.verifyToken,
  statisticalOfExerController.createStatisticalOfExercise
);
router.post(
  "/delete/by-user-and-lession",
  authMiddleware.verifyToken,
  statisticalOfExerController.deleteStatisticalOfExerciseByUserAndLession
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  statisticalOfExerController.updateStatisticalOfExercise
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  statisticalOfExerController.deleteStatisticalOfExercise
);

module.exports = router;
