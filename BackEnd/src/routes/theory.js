const express = require("express");
const { modelName } = require("../app/models/Unit");
const router = express.Router();
const theoryController = require("../app/controller/theoryController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/:id", theoryController.getContentOfTheory);
router.get("/list-theory", theoryController.getTheory);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  theoryController.createTheory
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  theoryController.updateTheory
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  theoryController.deleteTheory
);
module.exports = router;
// check done
