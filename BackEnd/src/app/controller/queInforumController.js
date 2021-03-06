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
    const listAuthor = await User.find(
      { _id: { $in: authorArray } },
      { password: 0 }
    );

    res.status(200).json({
      message: "đã câu hỏi trong diễn đàn thành công",
      listQuestionInForum: listQuestionInForum,
      listAuthor: listAuthor,
    });
  },
  //[get]/api/question-in-forum/list
  getQuestionInForumPagination: async (req, res) => {
    const currentPage = req.body.page;
    const questionInPage = 6;
    const contentToFind = req.body.contentToFind;
    const cateToFind = req.body.cateToFind;

    if (cateToFind == "") {
      const listTotalQuestionInForum = await QuestionInForum.find({
        $or: [
          { content: { $regex: contentToFind } },
          { title: { $regex: contentToFind } },
        ],
      });

      const listQuestionInForum = await QuestionInForum.find({
        $or: [
          { content: { $regex: contentToFind } },
          { title: { $regex: contentToFind } },
        ],
      })
        .skip(currentPage * questionInPage - questionInPage)
        .limit(questionInPage)
        .sort({
          createdAt: -1,
        });

      const authorArray = listQuestionInForum.map(({ userID }) => userID);
      const listAuthor = await User.find(
        { _id: { $in: authorArray } },
        { password: 0 }
      );

      res.status(200).json({
        message: "đã câu hỏi trong diễn đàn thành công",
        listQuestionInForum: listQuestionInForum,
        listAuthor: listAuthor,
        totalPage: Math.ceil(listTotalQuestionInForum.length / questionInPage),
      });
    } else if (cateToFind != "") {
      const listTotalQuestionInForum = await QuestionInForum.find({
        catQueID: cateToFind,
        $or: [
          { content: { $regex: contentToFind } },
          { title: { $regex: contentToFind } },
        ],
      });

      const listQuestionInForum = await QuestionInForum.find({
        catQueID: cateToFind,
        $or: [
          { content: { $regex: contentToFind } },
          { title: { $regex: contentToFind } },
        ],
      })
        .skip(currentPage * questionInPage - questionInPage)
        .limit(questionInPage)
        .sort({
          createdAt: -1,
        });

      const authorArray = listQuestionInForum.map(({ userID }) => userID);
      const listAuthor = await User.find(
        { _id: { $in: authorArray } },
        { password: 0 }
      );
      console.log("list author when choose category:", listAuthor);
      res.status(200).json({
        message: "đã câu hỏi trong diễn đàn thành công",
        listQuestionInForum: listQuestionInForum,
        listAuthor: listAuthor,
        totalPage: Math.ceil(listTotalQuestionInForum.length / questionInPage),
      });
    }
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
    const currentPage = req.query.page;
    const quesInPage = 5;
    const totalListQuestionInForum = await QuestionInForum.find({
      userID: userID,
    });
    const listQuestionInForum = await QuestionInForum.find({
      userID: userID,
    })
      .skip(currentPage * quesInPage - quesInPage)
      .limit(quesInPage)
      .sort({
        createdAt: -1,
      });
    res.status(200).json({
      message: "đã câu hỏi trong diễn đàn thành công",
      listQuestionInForum: listQuestionInForum,
      totalPage: Math.ceil(totalListQuestionInForum.length / quesInPage),
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
        const author = await User.findOne(
          { _id: questionInForum.userID },
          { password: 0 }
        );
        const category = await CategoryQuestion.findOne({
          _id: questionInForum.catQueID,
        });

        const listComment = await Comment.find({ questionID: questionID }).sort(
          { createdAt: -1 }
        );
        const commentArray = await listComment.map(({ userID }) => userID);
        const listUserComment = await User.find(
          {
            _id: { $in: commentArray },
          },
          { password: 0 }
        );

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
