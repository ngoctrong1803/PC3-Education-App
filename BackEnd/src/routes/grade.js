const express = require("express");
const router = express.Router();
const gradeController = require("../app/controller/gradeController");

router.get("/list", gradeController.getGrade);

module.exports = router;
