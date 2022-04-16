const QuestionInForum = require("../models/QuestionInForum");

const queInForumController = {
  //[get]/api/question-in-forum/list
  getQuestionInForum: async (req, res) => {
    const listQuestionInForum = await QuestionInForum.find({});
    res.status(200).json({
      message: "đã câu hỏi trong diễn đàn lấy thành công",
      listQuestionInForum: listQuestionInForum,
    });
  },
  //[post]/api/question-in-forum/create
  createQuestionInForum: async (req, res) => {
    const { title, content, userID, catQueID } = req.body;
    if (
      title == null ||
      content == null ||
      userID == null ||
      catQueID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo câu hỏi trong diễn đàn chưa đầy đủ",
      });
    } else {
      const checkExist = await QuestionInForum.findOne({
        title: title,
        content: content,
        userID: userID,
        catQueID: catQueID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        const newQuestionInForum = new QuestionInForum({
          title: title,
          content: content,
          userID: userID,
          catQueID: catQueID,
        });
        newQuestionInForum.save();
        res.status(200).json({
          message: "thêm mới câu hỏi thành công",
        });
      }
    }
  },
  //[put]/api/question-in-forum/update/:id
  updateQuestionInForum: async (req, res) => {
    const { title, content, userID, catQueID } = req.body;
    if (
      title == null ||
      content == null ||
      userID == null ||
      catQueID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo câu hỏi trong diễn đàn chưa đầy đủ",
      });
    } else {
      const checkExist = await QuestionInForum.findOne({
        title: title,
        content: content,
        userID: userID,
        catQueID: catQueID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        try {
          const checkId = await QuestionInForum.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await QuestionInForum.updateOne(
              { _id: req.params.id },
              {
                title: title,
                content: content,
                userID: userID,
                catQueID: catQueID,
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
  //[delete]/api/question-in-forum/delete/:id
  deleteQuestionInForum: async (req, res) => {
    try {
      const checkExist = await QuestionInForum.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await QuestionInForum.deleteOne({
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
module.exports = queInForumController;
