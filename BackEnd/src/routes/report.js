const express = require("express");
const router = express.Router();
const reportController = require("../app/controller/reportController");

router.get("/list", reportController.getReport);
router.post("/create", reportController.createReport);
router.put("/update/:id", reportController.updateReport);
router.delete("/delete/:id", reportController.deleteReport);

module.exports = router;
