const express = require("express");
const router = express.Router();
const rankController = require("../app/controller/rankController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", rankController.getRank);
router.post("/create", authMiddleware.verifyToken, rankController.createRank);
router.put(
  "/update/:id",
  authMiddleware.verifyToken,
  rankController.updateRank
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  rankController.deleteRank
);

module.exports = router;
