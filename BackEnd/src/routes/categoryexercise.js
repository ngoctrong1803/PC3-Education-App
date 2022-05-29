const express = require("express");
const router = express.Router();
const cateExerController = require("../app/controller/cateExerController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get("/list", cateExerController.getCateExer);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  cateExerController.createCateExer
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  cateExerController.updateCateExer
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  cateExerController.deleteCateExer
);

module.exports = router;
