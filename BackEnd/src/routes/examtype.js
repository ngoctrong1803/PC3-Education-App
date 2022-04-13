const express = require("express");
const router = express.Router();
const examTypeController = require("../app/controller/examTypeController");

router.get("/list", examTypeController.getExamType);
router.post("/create", examTypeController.createExamType);
router.put("/update/:id", examTypeController.updateExamType);
router.delete("/delete/:id", examTypeController.deleteExamType);

module.exports = router;
