const express = require("express");
const router = express.Router();
const topicController = require("../app/controller/topicController");

router.get("/list", topicController.getTopic);
router.post("/create", topicController.createTopic);
router.put("/update/:id", topicController.updateTopic);
router.delete("/delete/:id", topicController.deleteTopic);

module.exports = router;
