const express = require("express");
const router = express.Router();
const queInForumController = require("../app/controller/queInforumController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", queInForumController.getQuestionInForum);
router.post("/list", queInForumController.getQuestionInForumPagination);
router.get("/list-index", queInForumController.getQuestionInForumIndex);
router.get("/user/:id", queInForumController.getQuestionInForumByUserID);
router.get(
  "/content/:id",
  queInForumController.getContentOfQuestionByQuestionID
);
router.post(
  "/create",
  authMiddleware.verifyToken,
  queInForumController.createQuestionInForum
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  queInForumController.updateQuestionInForum
);
router.put(
  "/update-status/:id",
  authMiddleware.verifyToken,
  queInForumController.updateStatusQuestionInForum
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  queInForumController.deleteQuestionInForum
);

module.exports = router;
