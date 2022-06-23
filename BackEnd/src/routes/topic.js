const express = require("express");
const router = express.Router();
const topicController = require("../app/controller/topicController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", topicController.getTopic);
router.post("/list/:page", topicController.getTopicPagination);
router.post("/list-in-index/:page", topicController.getTopicPaginationIndex);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  topicController.createTopic
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  topicController.updateTopic
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  topicController.deleteTopic
);

module.exports = router;
// done check
