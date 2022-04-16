const express = require("express");
const router = express.Router();
const rankController = require("../app/controller/rankController");

router.get("/list", rankController.getRank);
router.post("/create", rankController.createRank);
router.put("/update/:id", rankController.updateRank);
router.delete("/delete/:id", rankController.deleteRank);

module.exports = router;
