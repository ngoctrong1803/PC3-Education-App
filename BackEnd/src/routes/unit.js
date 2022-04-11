const express = require("express");
const router = express.Router();
const unitController = require("../app/controller/unitController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list-unit", authMiddleware.checkAdmin, unitController.getUnit);
router.post("/create", authMiddleware.checkAdmin, unitController.createUnit);
router.put("/update/:id", authMiddleware.checkAdmin, unitController.updateUnit);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  unitController.deleteUnit
);

module.exports = router;
