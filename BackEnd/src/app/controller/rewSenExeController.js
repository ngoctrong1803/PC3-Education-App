const RewriteSentencesExercise = require("../models/RewriteSentencesExercise");

const rewSenExeController = {
  //[get]/api/rewrite-sentences-exercise/list
  getRewriteSentencesExercise: async (req, res) => {
    const listRewSenExe = await RewriteSentencesExercise.find({});
    res.status(200).json({
      message: "đã lấy thành công",
      listRewSenExe: listRewSenExe,
    });
  },
  //[post]/api/rewrite-sentences-exercise/create
  createRewriteSentencesExercise: async (req, res) => {
    const { question, answer, recommend, explain, lessionID, catExeID } =
      req.body;
    if (
      question == null ||
      recommend == null ||
      explain == null ||
      answer == null ||
      lessionID == null ||
      catExeID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo 1 câu hỏi chưa đầy đủ",
      });
    } else {
      const checkExist = await RewriteSentencesExercise.findOne({
        question: question,
        recommend: recommend,
        explain: explain,
        answer: answer,
        lessionID: lessionID,
        catExeID: catExeID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        const newRewriteSentencesExercise = new RewriteSentencesExercise({
          question: question,
          recommend: recommend,
          explain: explain,
          answer: answer,
          lessionID: lessionID,
          catExeID: catExeID,
        });
        newRewriteSentencesExercise.save();
        res.status(200).json({
          message: "thêm mới câu hỏi thành công",
        });
      }
    }
  },
  //[put]/api/rewrite-sentences-exercise/update/:id
  updateRewriteSentencesExercise: async (req, res) => {
    const { question, answer, recommend, explain, lessionID, catExeID } =
      req.body;
    if (
      question == null ||
      recommend == null ||
      explain == null ||
      answer == null ||
      lessionID == null ||
      catExeID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo 1 câu hỏi chưa đầy đủ",
      });
    } else {
      const checkExist = await RewriteSentencesExercise.findOne({
        question: question,
        recommend: recommend,
        explain: explain,
        answer: answer,
        lessionID: lessionID,
        catExeID: catExeID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        try {
          const checkId = await RewriteSentencesExercise.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await RewriteSentencesExercise.updateOne(
              { _id: req.params.id },
              {
                question: question,
                recommend: recommend,
                explain: explain,
                answer: answer,
                lessionID: lessionID,
                catExeID: catExeID,
              }
            );
            res.status(200).json({
              message: "cập nhật thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại câu hỏi cần cập nhật",
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
  //[delete]/api/rewrite-sentences-exercise/delete/:id
  deleteRewriteSentencesExercise: async (req, res) => {
    try {
      const checkExist = await RewriteSentencesExercise.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await RewriteSentencesExercise.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa câu hỏi thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại câu hỏi cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = rewSenExeController;
