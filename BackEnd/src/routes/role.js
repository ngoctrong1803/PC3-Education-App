const express = require("express");
const router = express.Router();
const roleController = require("../app/controller/roleController");
const authMiddleware = require("../app/middlewares/authMiddleware");
router.get("/list", roleController.getRole);
router.post("/create", authMiddleware.checkAdmin, roleController.createRole);
router.put("/update/:id", authMiddleware.checkAdmin, roleController.updateRole);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  roleController.deleteRole
);

module.exports = router;
