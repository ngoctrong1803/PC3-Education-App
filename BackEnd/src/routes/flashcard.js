const express = require("express");
const router = express.Router();
const flashcardController = require("../app/controller/flashcardController");

router.get("/list", flashcardController.getFlashcard);
router.get("/list/:id", flashcardController.getFlashcardByTopicID);
router.post("/create", flashcardController.createFlashcard);
router.put("/update/:id", flashcardController.updateFlashcard);
router.delete("/delete/:id", flashcardController.deleteFlashcard);

module.exports = router;
