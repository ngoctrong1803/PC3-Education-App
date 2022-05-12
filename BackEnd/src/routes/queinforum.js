const express = require("express");
const router = express.Router();
const queInForumController = require("../app/controller/queInforumController");

router.get("/list", queInForumController.getQuestionInForum);
router.get("/user/:id", queInForumController.getQuestionInForumByUserID);
router.get(
  "/content/:id",
  queInForumController.getContentOfQuestionByQuestionID
);
router.post("/create", queInForumController.createQuestionInForum);
router.put("/update/:id", queInForumController.updateQuestionInForum);
router.put(
  "/update-status/:id",
  queInForumController.updateStatusQuestionInForum
);
router.delete("/delete/:id", queInForumController.deleteQuestionInForum);

module.exports = router;
