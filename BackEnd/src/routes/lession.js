const express = require("express");
const router = express.Router();
const authMiddleware = require("../app/middlewares/authMiddleware");
const lessionController = require("../app/controller/lessionController");

router.get("/list-lession", lessionController.getLession);
router.post("/create", lessionController.createLession);
router.put("/update/:id", lessionController.updateLession);
router.delete("/delete/:id", lessionController.deleteLession);

module.exports = router;
