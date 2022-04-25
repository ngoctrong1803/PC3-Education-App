const ExamQuestion = require("../models/ExamQuestion");
const Exam = require("../models/Exam");
const examQuestionController = {
  //[get]/api/exam-question/list
  getExamQuestion: async (req, res) => {
    const listExamQuestion = await ExamQuestion.find({});
    res.status(200).json({
      message: "lấy thành công danh sách câu hỏi",
      listExamQuestion: listExamQuestion,
    });
  },
  //[get]/api/exam-question/list
  getExamQuestionByExamID: async (req, res) => {
    const examID = req.params.id;
    const exam = await Exam.findOne({ _id: examID });
    if (exam) {
      const listExamQuestion = await ExamQuestion.find({ examID: examID });
      res.status(200).json({
        message: "lấy thành công danh sách câu hỏi",
        listExamQuestion: listExamQuestion,
      });
    } else {
      res.status(400).json({
        message: "không tồn tại bài kiểm tra",
      });
    }
  },
  //[get]/api/exam-question/list
  getExamQuestionByQuestionID: async (req, res) => {
    const quesionID = req.params.id;
    const question = await ExamQuestion.findOne({ _id: quesionID });
    if (question) {
      const exam = await Exam.findOne({ _id: question.examID });
      res.status(200).json({
        message: "lấy thành nội dung câu hỏi",
        question: question,
        exam: exam,
      });
    } else {
      res.status(400).json({
        message: "không tồn tại câu hỏi",
      });
    }
  },
  //[post]/api/exam-question/create
  createExamQuestion: async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      explain,
      recommend,
      examID,
      catExeID,
    } = req.body;
    const checkExamQuestion = await ExamQuestion.findOne({
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
      explain: explain,
      recommend: recommend,
      examID: examID,
      catExeID: catExeID,
    });
    if (checkExamQuestion) {
      res.status(400).json({
        message: "đã tồn tại câu hỏi này",
      });
    } else {
      const newExamQuestion = new ExamQuestion({
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
        explain: explain,
        recommend: recommend,
        examID: examID,
        catExeID: catExeID,
      });
      newExamQuestion.save();
      res.status(200).json({
        message: "tạo mới câu hỏi thành công",
      });
    }
  },
  //[put]/api/ExamQuestion/list-ExamQuestion
  updateExamQuestion: async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      explain,
      recommend,
      examID,
      catExeID,
    } = req.body;
    const checkExamQuestion = await ExamQuestion.findOne({
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
      explain: explain,
      recommend: recommend,
      examID: examID,
      catExeID: catExeID,
    });
    if (checkExamQuestion) {
      res.status(400).json({
        message: "đã tồn tại câu hỏi này",
      });
    } else {
      let ExamQuestionID = req.params.id;
      try {
        const checkUpdate = await ExamQuestion.findOne({
          _id: ExamQuestionID,
        });
        if (checkUpdate) {
          await ExamQuestion.updateOne(
            { _id: ExamQuestionID },
            {
              question: question,
              option1: option1,
              option2: option2,
              option3: option3,
              option4: option4,
              answer: answer,
              explain: explain,
              recommend: recommend,
              examID: examID,
              catExeID: catExeID,
            }
          );
          res.status(200).json({
            message: "đã cập nhật câu hỏi thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại câu hỏi bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "id không đúng định dạng",
        });
      }
    }
  },
  //[delete]/api/ExamQuestion/list-ExamQuestion
  deleteExamQuestion: async (req, res) => {
    let examQuestionID = req.params.id;
    try {
      const checkDelete = await ExamQuestion.findOne({
        _id: examQuestionID,
      });
      if (checkDelete) {
        await ExamQuestion.deleteOne({
          _id: examQuestionID,
        });
        res.status(200).json({
          message: "xóa câu hỏi thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm thấu câu hỏi cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "id không đúng định dạng",
      });
    }
  },
};
module.exports = examQuestionController;
