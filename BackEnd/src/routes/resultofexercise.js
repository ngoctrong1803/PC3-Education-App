const express = require("express");
const router = express.Router();
const resultOfExerController = require("../app/controller/resultOfExerController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", resultOfExerController.getResultOfExercise);
router.get("/:id", resultOfExerController.getResultOfExerciseByStatisticalID);
router.post(
  "/create",
  authMiddleware.verifyToken,
  resultOfExerController.createResultOfExercise
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  resultOfExerController.updateResultOfExercise
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  resultOfExerController.deleteResultOfExercise
);

module.exports = router;
