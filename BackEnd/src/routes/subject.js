const express = require("express");
const router = express.Router();
const subjectController = require("../app/controller/subjectController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get(
  "/get-list-subject",
  authMiddleware.checkAdmin,
  subjectController.getListSubject
);
router.get(
  "/get-list-subject/:page",
  authMiddleware.checkAdmin,
  subjectController.getListSubjectPagination
);
router.post(
  "/create",
  authMiddleware.checkAdmin,
  subjectController.createSucject
);
router.put(
  "/update/:id",
  authMiddleware.checkAdmin,
  subjectController.updateSubject
);
router.delete(
  "/delete/:id",
  authMiddleware.checkAdmin,
  subjectController.deleteSubject
);

module.exports = router;
