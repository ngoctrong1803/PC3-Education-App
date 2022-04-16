const QuestionLike = require("../models/QuestionLike");

const questionLikeController = {
  //[get]/api/questionLike/list
  getQuestionLike: async (req, res) => {
    const listQuestionLike = await QuestionLike.find({});
    res.status(200).json({
      message: "đã  question like lấy thành công",
      listQuestionLike: listQuestionLike,
    });
  },
  //[post]/api/QuestionLike/create
  createQuestionLike: async (req, res) => {
    const { userID, questionID } = req.body;
    if (userID == null || questionID == null) {
      res.status(200).json({
        message: "vui lòng điền đầy đủ thông tin của QuestionLike",
      });
    } else {
      const checkExist = await QuestionLike.findOne({
        userID: userID,
        questionID: questionID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "QuestionLike này đã tồn tại",
        });
      } else {
        const newQuestionLike = new QuestionLike({
          userID: userID,
          questionID: questionID,
        });
        newQuestionLike.save();
        res.status(200).json({
          message: "thêm mới QuestionLike",
        });
      }
    }
  },
  //[put]/api/QuestionLike/update/:id
  updateQuestionLike: async (req, res) => {
    const { userID, questionID } = req.body;
    if (userID == null || questionID == null) {
      res.status(200).json({
        message: "vui lòng nhập đầy đủ thông tin của QuestionLike",
      });
    } else {
      const checkExist = await QuestionLike.findOne({
        userID: userID,
        questionID: questionID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "QuestionLike này đã tồn tại",
        });
      } else {
        try {
          const checkId = await QuestionLike.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await QuestionLike.updateOne(
              { _id: req.params.id },
              {
                userID: userID,
                questionID: questionID,
              }
            );
            res.status(200).json({
              message: "cập nhật QuestionLike thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại QuestionLike cần cập nhật",
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
  //[delete]/api/QuestionLike/delete/:id
  deleteQuestionLike: async (req, res) => {
    try {
      const checkExist = await QuestionLike.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await QuestionLike.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa QuestionLike thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại QuestionLike cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = questionLikeController;
