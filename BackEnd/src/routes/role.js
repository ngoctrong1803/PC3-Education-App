const express = require("express");
const router = express.Router();
const roleController = require("../app/controller/roleController");

router.get("/list", roleController.getRole);
router.post("/create", roleController.createRole);
router.put("/update/:id", roleController.updateRole);
router.delete("/delete/:id", roleController.deleteRole);

module.exports = router;
