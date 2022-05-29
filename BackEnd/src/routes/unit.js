const express = require("express");
const router = express.Router();
const unitController = require("../app/controller/unitController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list-unit", unitController.getUnit);
router.post("/create", authMiddleware.checkTeacher, unitController.createUnit);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  unitController.updateUnit
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  unitController.deleteUnit
);

module.exports = router;
// done check
