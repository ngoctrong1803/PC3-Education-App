const Exam = require("../models/Exam");
const ExamQuestion = require("../models/ExamQuestion");
const StatisticalOfExam = require("../models/StatisticalOfExam");
const ResultOfExam = require("../models/ResultOfExam");

const examController = {
  //[get]/api/exam/list
  getExam: async (req, res) => {
    const listExam = await Exam.find({});
    res.status(200).json({
      message: "đã lấy thành công",
      listExam: listExam,
    });
  },

  //[get]/api/exam/list
  getExamPaginationIndex: async (req, res) => {
    const { page, contentToFind, subjectID, exaTypID } = req.body;
    const examInPage = 8;
    const currentPage = page;

    //const listExam = [];
    if (subjectID == "" && exaTypID != "") {
      //all subject and choose type
      const listTotalExam = await Exam.find({
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
    } else if (exaTypID == "" && subjectID != "") {
      //all type and choose subject
      const listTotalExam = await Exam.find({
        subjectID: subjectID,
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        subjectID: subjectID,
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
    } else if (exaTypID != "" && subjectID != "") {
      const listTotalExam = await Exam.find({
        subjectID: subjectID,
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        subjectID: subjectID,
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      console.log("list exam in here:", listExam);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
      // choose subject and choose type
    } else if (exaTypID == "" && subjectID == "") {
      const listTotalExam = await Exam.find({
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
    }
  },

  //[get]/api/exam/list
  getExamPagination: async (req, res) => {
    const { page, contentToFind, subjectID, exaTypID } = req.body;
    const examInPage = 3;
    const currentPage = page;

    //const listExam = [];
    if (subjectID == "" && exaTypID != "") {
      //all subject and choose type
      const listTotalExam = await Exam.find({
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
    } else if (exaTypID == "" && subjectID != "") {
      //all type and choose subject
      const listTotalExam = await Exam.find({
        subjectID: subjectID,
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        subjectID: subjectID,
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
    } else if (exaTypID != "" && subjectID != "") {
      const listTotalExam = await Exam.find({
        subjectID: subjectID,
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        subjectID: subjectID,
        exaTypID: exaTypID,
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      console.log("list exam in here:", listExam);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
      // choose subject and choose type
    } else if (exaTypID == "" && subjectID == "") {
      const listTotalExam = await Exam.find({
        title: { $regex: contentToFind },
      });
      const listExam = await Exam.find({
        title: { $regex: contentToFind },
      })
        .skip(currentPage * examInPage - examInPage)
        .limit(examInPage);
      res.status(200).json({
        message: "đã lấy thành công",
        listExam: listExam,
        totalPage: Math.ceil(listTotalExam.length / examInPage),
      });
    }
  },
  //[get]/api/exam/:id
  getExamByID: async (req, res) => {
    const examID = req.params.id;
    const exam = await Exam.findOne({ _id: examID });
    if (exam) {
      res.status(200).json({
        message: "đã lấy thành công",
        exam: exam,
      });
    } else {
      res.status(400).json({
        message: "không tồn tại",
      });
    }
  },

  //[post]/api/exam/create
  createExam: async (req, res) => {
    const { title, time, totalQuestion, imageUrl, subjectID, exaTypID } =
      req.body;
    if (
      title == null ||
      time == null ||
      totalQuestion == null ||
      imageUrl == null ||
      exaTypID == null ||
      subjectID == null
    ) {
      res.status(400).json({
        message: "thông tin để tạo 1 bài kiểm tra chưa đầy đủ",
      });
    } else {
      const checkExist = await Exam.findOne({
        title: title,
        time: time,
        totalQuestion: totalQuestion,
        imageUrl: imageUrl,
        exaTypID: exaTypID,
        subjectID: subjectID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "bài kiểm tra này đã tồn tại",
        });
      } else {
        const newExam = new Exam({
          title: title,
          time: time,
          totalQuestion: totalQuestion,
          imageUrl: imageUrl,
          exaTypID: exaTypID,
          subjectID: subjectID,
        });
        newExam.save();
        res.status(200).json({
          message: "thêm mới bài kiểm tra thành công",
        });
      }
    }
  },
  //[put]/api/exam/update/:id
  updateExam: async (req, res) => {
    const { title, time, totalQuestion, imageUrl, subjectID, exaTypID } =
      req.body;
    if (
      title == null ||
      time == null ||
      totalQuestion == null ||
      imageUrl == null ||
      exaTypID == null ||
      subjectID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo bài kiểm tra chưa đầy đủ",
      });
    } else {
      const checkExist = await Exam.findOne({
        title: title,
        time: time,
        totalQuestion: totalQuestion,
        imageUrl: imageUrl,
        exaTypID: exaTypID,
        subjectID: subjectID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "bài kiểm tra này đã tồn tại",
        });
      } else {
        try {
          const checkId = await Exam.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await Exam.updateOne(
              { _id: req.params.id },
              {
                title: title,
                time: time,
                totalQuestion: totalQuestion,
                imageUrl: imageUrl,
                exaTypID: exaTypID,
                subjectID: subjectID,
              }
            );
            res.status(200).json({
              message: "cập nhật thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại bài kiểm tra cần cập nhật",
            });
          }
        } catch (err) {
          res.status(400).json({
            message: "Id không hợp lệ",
          });
        }
      }
    }
  },
  //[delete]/api/exam/delete/:id
  deleteExam: async (req, res) => {
    try {
      const checkExist = await Exam.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        const listStatistical = await StatisticalOfExam.find({
          examID: checkExist._id,
        });
        const statisticalIDArray = listStatistical.map(({ _id }) => {
          return _id;
        });

        await ResultOfExam.deleteMany({
          statisticalID: { $in: statisticalIDArray },
        });
        await StatisticalOfExam.deleteMany({
          examID: checkExist._id,
        });
        await ExamQuestion.deleteMany({
          examID: checkExist._id,
        });
        await Exam.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa bài kiểm tra thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại bài kiểm cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = examController;
