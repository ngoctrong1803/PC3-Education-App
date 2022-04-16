const express = require("express");
const router = express.Router();
const cateQuesController = require("../app/controller/cateQuesController");

router.get("/list", cateQuesController.getCateQuestion);
router.post("/create", cateQuesController.createCateQuestion);
router.put("/update/:id", cateQuesController.updateCateQuestion);
router.delete("/delete/:id", cateQuesController.deleteCateQuestion);

module.exports = router;
