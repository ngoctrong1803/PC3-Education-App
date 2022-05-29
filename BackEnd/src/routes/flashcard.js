const express = require("express");
const router = express.Router();
const flashcardController = require("../app/controller/flashcardController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", flashcardController.getFlashcard);
router.get("/list/:id", flashcardController.getFlashcardByTopicID);
router.post("/list/:id", flashcardController.getFlashcardByTopicIDPagination);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  flashcardController.createFlashcard
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  flashcardController.updateFlashcard
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  flashcardController.deleteFlashcard
);

module.exports = router;
