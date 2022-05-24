const QuestionInForum = require("../models/QuestionInForum");
const QuestionInLike = require("../models/QuestionLike");
const Comment = require("../models/Comment");
const CommentLike = require("../models/CommentLike");
const User = require("../models/User");
const CategoryQuestion = require("../models/CategoryQuestion");

const queInForumController = {
  //[get]/api/question-in-forum/list
  getQuestionInForum: async (req, res) => {
    const listQuestionInForum = await QuestionInForum.find({});
    const authorArray = listQuestionInForum.map(({ userID }) => userID);
    const listAuthorTemp = await User.find({ _id: { $in: authorArray } });
    const listAuthor = [];
    listAuthorTemp.map((authorItem, index) => {
      author = {
        userID: authorItem._id,
        fullname: authorItem.fullname,
        email: authorItem.email,
      };
      listAuthor.push(author);
    });
    res.status(200).json({
      message: "đã câu hỏi trong diễn đàn thành công",
      listQuestionInForum: listQuestionInForum,
      listAuthor: listAuthor,
    });
  },
  getQuestionInForumIndex: async (req, res) => {
    const listQuestion = await QuestionInForum.aggregate([
      { $match: { status: true } },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json({
      message: "đã câu hỏi trong diễn đàn thành công",
      listQuestion,
    });
  },
  //[get]/api/question-in-forum/list
  getQuestionInForumByUserID: async (req, res) => {
    const userID = req.params.id;
    const listQuestionInForum = await QuestionInForum.find({
      userID: userID,
    });
    res.status(200).json({
      message: "đã câu hỏi trong diễn đàn thành công",
      listQuestionInForum: listQuestionInForum,
    });
  },
  //[get]/api/question-in-forum/list
  getContentOfQuestionByQuestionID: async (req, res) => {
    try {
      const questionID = req.params.id;
      const questionInForum = await QuestionInForum.findOne({
        _id: questionID,
      });
      if (questionInForum) {
        const authorTemp = await User.findOne({ _id: questionInForum.userID });
        const author = {
          userID: authorTemp._id,
          fullname: authorTemp.fullname,
          email: authorTemp.email,
        };
        const category = await CategoryQuestion.findOne({
          _id: questionInForum.catQueID,
        });

        const listComment = await Comment.find({ questionID: questionID }).sort(
          { createdAt: -1 }
        );
        const commentArray = await listComment.map(({ userID }) => userID);
        const listUserCommentTemp = await User.find({
          _id: { $in: commentArray },
        });
        const listUserComment = [];
        listUserCommentTemp.map((userItem, index) => {
          const dataToAdd = {
            fullname: userItem.fullname,
            email: userItem.email,
            userID: userItem._id,
          };
          listUserComment.push(dataToAdd);
        });

        res.status(200).json({
          message: "đã lấy câu hỏi trong diễn đàn thành công",
          questionInForum: questionInForum,
          author: author,
          category: category,
          listComment: listComment,
          listUserComment: listUserComment,
        });
      } else {
        res.status(400).json({
          message: "không tồn tại câu hỏi cần tìm",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Id không đúng định dạng!",
      });
    }
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
          status: false,
        });
        newQuestionInForum.save();
        res.status(200).json({
          message: "thêm mới câu hỏi thành công",
        });
      }
    }
  },
  //[put]/api/question-in-forum/update-status/:id
  updateStatusQuestionInForum: async (req, res) => {
    try {
      const checkId = await QuestionInForum.findOne({
        _id: req.params.id,
      });
      if (checkId) {
        await QuestionInForum.updateOne(
          { _id: req.params.id },
          {
            status: !checkId.status,
          }
        );
        res.status(200).json({
          message: "cập nhật trạng thái thành công",
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
                status: false,
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
        const listComment = await Comment.find({ questionID: req.params.id });
        const commentArray = listComment.map(({ _id }) => _id);

        // delete many comment like
        await CommentLike.deleteMany({
          commentID: { $in: commentArray },
        });

        //delete many comment
        await Comment.deleteMany({
          questionID: req.params.id,
        });

        //delete question like
        await QuestionInLike.deleteMany({
          questionID: req.params.id,
        });

        //delete question
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
