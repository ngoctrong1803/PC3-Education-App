const express = require("express");
const router = express.Router();
const reportController = require("../app/controller/reportController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", reportController.getReport);
router.post(
  "/create",
  authMiddleware.verifyToken,
  reportController.createReport
);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  reportController.updateReport
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  reportController.deleteReport
);

module.exports = router;
