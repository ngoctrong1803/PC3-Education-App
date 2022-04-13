const express = require("express");
const router = express.Router();
const rewSenExeController = require("../app/controller/rewSenExeController");

router.get("/list", rewSenExeController.getRewriteSentencesExercise);
router.post("/create", rewSenExeController.createRewriteSentencesExercise);
router.put("/update/:id", rewSenExeController.updateRewriteSentencesExercise);
router.delete(
  "/delete/:id",
  rewSenExeController.deleteRewriteSentencesExercise
);

module.exports = router;
