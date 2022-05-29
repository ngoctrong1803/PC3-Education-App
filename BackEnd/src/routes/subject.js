const express = require("express");
const router = express.Router();
const subjectController = require("../app/controller/subjectController");
const authMiddleware = require("../app/middlewares/authMiddleware");

router.get(
  "/get-list-subject",
  //authMiddleware.checkAdmin,
  subjectController.getListSubject
);
router.get(
  "/list-subject-by-grade/:id",
  //authMiddleware.checkAdmin,
  subjectController.getSubjectByGradeID
);
router.post(
  "/get-list-subject/:page",
  //authMiddleware.checkAdmin,
  subjectController.getListSubjectPagination
);
router.get(
  "/content/:slug",
  //authMiddleware.checkAdmin,
  subjectController.getContentOfSubject
);
router.post(
  "/create",
  authMiddleware.checkTeacher,
  subjectController.createSucject
);
router.put(
  "/update/:id",
  authMiddleware.checkTeacher,
  subjectController.updateSubject
);
router.delete(
  "/delete/:id",
  authMiddleware.checkTeacher,
  subjectController.deleteSubject
);

module.exports = router;
// check done
