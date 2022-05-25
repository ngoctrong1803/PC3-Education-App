const Subject = require("../models/Subject");
const Grade = require("../models/Grade");
const Unit = require("../models/Unit");
const Lession = require("../models/Lession");
const MCExercise = require("../models/MCExercise");
const ListenExercise = require("../models/ListenExercise");
const RewriteSentencesExercise = require("../models/RewriteSentencesExercise");
const slugify = require("slugify");
const GapFillingExercise = require("../models/GapFillingExercise");
const StatisticalOfExercise = require("../models/StatisticalOfExercise");
const ResultOfExercise = require("../models/ResultOfExercise");
const Exam = require("../models/Exam");
const Theory = require("../models/Theory");
const ExamQuestion = require("../models/ExamQuestion");
const StatisticalOfExam = require("../models/StatisticalOfExam");
const ResultOfExam = require("../models/ResultOfExam");

const subjectController = {
  //[get]/api/subject/:slug (here is subject detail)

  //[get]/api/subejct/get-list-subject
  getListSubject: async (req, res) => {
    let subjectInPage = 3;
    const listSubject = await Subject.find({}).sort({
      gradeID: -1,
    });

    let totalSubject = await Subject.countDocuments();
    res.status(200).json({
      message: "lấy danh sách môn học thành công",
      listSubject: listSubject,
      totalPage: Math.ceil(totalSubject / subjectInPage),
      currentPage: 1,
    });
  },
  //[get]/api/subejct/get-list-subject/:page
  getListSubjectPagination: async (req, res) => {
    try {
      let subjectInPage = 3;
      let currentPage = req.params.page;
      let subjectName = req.body.subject_name;
      let grade = req.body.grade;

      const subjectToFind = await Subject.find({
        name: { $regex: subjectName },
      });

      const gradeToFind = await Grade.findOne({ _id: grade });

      if (!subjectToFind[0] && !gradeToFind) {
        // !subject && !grade
        const listSubject = await Subject.find({})
          .sort({
            gradeID: -1,
          })
          .skip(currentPage * subjectInPage - subjectInPage)
          .limit(subjectInPage);
        let totalSubject = await Subject.countDocuments();
        res.status(200).json({
          message: "lấy danh sách môn học thành công",
          listSubject: listSubject,
          totalPage: Math.ceil(totalSubject / subjectInPage),
          currentPage: currentPage,
        });
      } else if (!subjectToFind[0] && gradeToFind) {
        // !subject && grade
        const listTotalSubject = await Subject.find({
          gradeID: gradeToFind._id,
        });
        const listSubject = await Subject.find({ gradeID: gradeToFind._id })
          .sort({
            gradeID: -1,
          })
          .skip(currentPage * subjectInPage - subjectInPage)
          .limit(subjectInPage);
        let totalSubject = listTotalSubject.length;

        res.status(200).json({
          message: "lấy danh sách môn học thành công",
          listSubject: listSubject,
          totalPage: Math.ceil(totalSubject / subjectInPage),
          currentPage: currentPage,
        });
      } else if (subjectToFind[0] && !gradeToFind) {
        // subject && !grade
        const listTotalSubject = await Subject.find({
          name: { $regex: subjectName },
        });
        const listSubject = await Subject.find({
          name: { $regex: subjectName },
        })
          .sort({
            gradeID: -1,
          })
          .skip(currentPage * subjectInPage - subjectInPage)
          .limit(subjectInPage);
        let totalSubject = listTotalSubject.length;
        res.status(200).json({
          message: "lấy danh sách môn học thành công",
          listSubject: listSubject,
          totalPage: Math.ceil(totalSubject / subjectInPage),
          currentPage: currentPage,
        });
      } else if (subjectToFind[0] && gradeToFind) {
        // subject && !grade
        const listTotalSubject = await Subject.find({
          name: { $regex: subjectName },
          gradeID: gradeToFind._id,
        });
        const listSubject = await Subject.find({
          name: { $regex: subjectName },
          gradeID: gradeToFind._id,
        })
          .sort({
            gradeID: -1,
          })
          .skip(currentPage * subjectInPage - subjectInPage)
          .limit(subjectInPage);
        let totalSubject = listTotalSubject.length;
        res.status(200).json({
          message: "lấy danh sách môn học thành công",
          listSubject: listSubject,
          totalPage: Math.ceil(totalSubject / subjectInPage),
          currentPage: currentPage,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
      });
    }
  },
  //[get]/api/subjects/content
  getContentOfSubject: async (req, res) => {
    const slug = req.params.slug;
    const subject = await Subject.findOne({ slug: slug });
    const subejctID = subject._id;
    const units = await Unit.find({ subjectID: subejctID });
    const unitIdArray = units.map(({ _id }) => _id); // chức các id của unit
    const lessions = await Lession.find({
      unitID: { $in: unitIdArray },
    }).sort({ lessionNumber: 1 });
    res.status(201).json({
      message: "lấy nội dung môn học thành công",
      subject: subject,
      units: units,
      lessions: lessions,
    });
    // const lessionIdArray = lessions.map(({ _id }) => _id);
  },
  getSubjectByGradeID: async (req, res) => {
    const gradeID = req.params.id;
    if (gradeID) {
      const listSubject = await Subject.find({
        gradeID: gradeID,
      });
      res.status(200).json({
        message: "lấy môn học thành công",
        listSubject: listSubject,
      });
    } else {
      res.status(400).json({
        message: "lấy môn học thất bại",
      });
    }
  },
  //[post]/api/subject/create
  createSucject: async (req, res) => {
    const checkSubject = await Subject.findOne({
      name: req.body.name,
      gradeID: req.body.gradeID,
    });
    if (checkSubject) {
      res.status(400).json({
        message: "môn học đã tồn tại",
      });
    } else {
      const newsubject = new Subject({
        name: req.body.name,
        gradeID: req.body.gradeID,
        image: req.body.image,
      });
      newsubject.save();
      res
        .status(201)
        .json({ message: "tạo mới thành công", subject: newsubject });
    }
  },
  //[put]/api/subject/update/:id
  updateSubject: async (req, res) => {
    const subject = await Subject.findOne({
      name: req.body.name,
      gradeID: req.body.gradeID,
    });
    if (subject?._id && subject?._id != req.params.id) {
      res.status(400).json({
        message: "môn học đã tồn tại",
      });
    } else {
      try {
        const subject = await Subject.findOne({ _id: req.params.id });
        if (subject) {
          await Subject.updateOne(
            { _id: req.params.id },
            {
              name: req.body.name,
              gradeID: req.body.gradeID,
              slug: slugify(req.body.name + "-" + req.body.gradeID),
              image: req.body.image,
            }
          );
          res.status(200).json({
            message: "cập nhật môn học thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại môn học bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại môn học bạn muốn cập nhật",
        });
      }
    }
  },
  //[delete]/api/subject/delete/:id
  deleteSubject: async (req, res) => {
    try {
      const subject = await Subject.findOne({ _id: req.params.id });
      if (subject?._id) {
        //handle find data to delete
        const subjectID = subject._id;
        console.log("subject:", subject);

        const units = await Unit.find({ subjectID: subjectID });
        console.log("units:", units);
        const unitIDArray = units.map(({ _id }) => _id);
        console.log("unitArray:", unitIDArray);
        const lessions = await Lession.find({ unitID: { $in: unitIDArray } });
        console.log("lessions:", lessions);
        const lessionIdArray = lessions.map(({ _id }) => _id);
        console.log("lessionArray:", lessionIdArray);
        const theory = await Theory.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("theory:", theory);
        const mcExercise = await MCExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("mcExercise:", mcExercise);
        const listenExercise = await ListenExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("listenExercise:", listenExercise);
        const rewriteSentencesExercise = await RewriteSentencesExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("rewriteSentencesExercise:", rewriteSentencesExercise);
        const gapFillingExercise = await GapFillingExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("gapFillingExercise:", gapFillingExercise);

        const statisticalOfExercise = await StatisticalOfExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("statisticalOfExercise:", statisticalOfExercise);
        const statisticalOfExerciseIDArray = statisticalOfExercise.map(
          ({ _id }) => _id
        );
        console.log(
          "statisticalOfExerciseIDArray:",
          statisticalOfExerciseIDArray
        );
        const resultOfExercise = await ResultOfExercise.find({
          statisticalID: { $in: statisticalOfExerciseIDArray },
        });
        console.log("resultOfExercise:", resultOfExercise);

        const exams = await Exam.find({
          subjectID: subjectID,
        });
        console.log("exams:", exams);
        const examIDArray = exams.map(({ _id }) => _id);
        console.log("examIDArray:", examIDArray);
        const examQuestion = await ExamQuestion.find({
          examID: { $in: examIDArray },
        });
        console.log("examQuestion", examQuestion);
        const statisticalOfExam = await StatisticalOfExam.find({
          examID: { $in: examIDArray },
        });
        console.log("statisticalOfExam", statisticalOfExam);
        const statisticalOfExamIDArray = statisticalOfExam.map(
          ({ _id }) => _id
        );
        const resultOfExam = await ResultOfExam.find({
          statisticalID: { $in: statisticalOfExamIDArray },
        });
        console.log("result of exam:", resultOfExam);

        // handle delete
        //delete exam
        await ExamQuestion.deleteMany({ examID: { $in: examIDArray } });
        await ResultOfExam.deleteMany({
          statisticalID: { $in: statisticalOfExamIDArray },
        });
        await StatisticalOfExam.deleteMany({ examID: { $in: examIDArray } });
        await Exam.deleteMany({
          subjectID: subjectID,
        });
        //delete mcExercise
        await MCExercise.deleteMany({
          lessionID: { $in: lessionIdArray },
        });
        await ResultOfExercise.deleteMany({
          statisticalID: { $in: statisticalOfExerciseIDArray },
        });
        await StatisticalOfExercise.deleteMany({
          lessionID: { $in: lessionIdArray },
        });
        await Theory.deleteMany({
          lessionID: { $in: lessionIdArray },
        });
        await Lession.deleteMany({
          unitID: { $in: unitIDArray },
        });
        await Unit.deleteMany({
          subjectID: subjectID,
        });
        await Subject.deleteOne({ _id: subjectID });

        res.status(200).json({
          message: "xóa môn học thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm thấy môn học cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "đã xảy ra ngoại lệ. không tìm thấy môn học cần xóa",
      });
    }
  },
};
module.exports = subjectController;
