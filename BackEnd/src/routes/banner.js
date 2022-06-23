const express = require("express");
const router = express.Router();
const bannerController = require("../app/controller/bannerController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", bannerController.getBanner);
router.post(
  "/create",
  authMiddleware.checkAdmin,
  bannerController.createBanner
);
router.put(
  "/update/:id",
  authMiddleware.checkAdmin,
  bannerController.updateBanner
);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  bannerController.deleteBanner
);

module.exports = router;
