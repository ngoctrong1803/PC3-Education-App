const express = require("express");
const { modelName } = require("../app/models/Unit");
const router = express.Router();
const theoryController = require("../app/controller/theoryController");

router.get("/list-theory", theoryController.getTheory);
router.post("/create", theoryController.createTheory);
router.put("/update/:id", theoryController.updateTheory);
router.delete("/delete/:id", theoryController.deleteTheory);
module.exports = router;
