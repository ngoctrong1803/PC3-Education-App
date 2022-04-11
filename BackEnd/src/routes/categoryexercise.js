const express = require("express");
const router = express.Router();
const cateExerController = require("../app/controller/cateExerController");

router.get("/list", cateExerController.getCateExer);
router.post("/create", cateExerController.createCateExer);
router.put("/update/:id", cateExerController.updateCateExer);
router.delete("/delete/:id", cateExerController.deleteCateExer);

module.exports = router;
