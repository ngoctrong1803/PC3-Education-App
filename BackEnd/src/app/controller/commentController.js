const Comment = require("../models/Comment");

const commentController = {
  //[get]/api/comment/list
  getComment: async (req, res) => {
    const listComment = await Comment.find({});
    res.status(200).json({
      message: "đã bình luận trong diễn đàn lấy thành công",
      listComment: listComment,
    });
  },
  //[post]/api/comment/create
  createComment: async (req, res) => {
    const { content, userID, questionID } = req.body;
    if (content == null || userID == null || questionID == null) {
      res.status(200).json({
        message: "thông tin để tạo bình luận trong diễn đàn chưa đầy đủ",
      });
    } else {
      const checkExist = await Comment.findOne({
        content: content,
        userID: userID,
        questionID: questionID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "bình luận này đã tồn tại",
        });
      } else {
        const newComment = new Comment({
          content: content,
          userID: userID,
          questionID: questionID,
        });
        newComment.save();
        res.status(200).json({
          message: "thêm mới bình luận thành công",
        });
      }
    }
  },
  //[put]/api/comment/update/:id
  updateComment: async (req, res) => {
    const { content, userID, questionID } = req.body;
    if (content == null || userID == null || questionID == null) {
      res.status(200).json({
        message: "thông tin để tạo bình luận trong diễn đàn chưa đầy đủ",
      });
    } else {
      const checkExist = await Comment.findOne({
        content: content,
        userID: userID,
        questionID: questionID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "bình luận này đã tồn tại",
        });
      } else {
        try {
          const checkId = await Comment.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await Comment.updateOne(
              { _id: req.params.id },
              {
                content: content,
                userID: userID,
                questionID: questionID,
              }
            );
            res.status(200).json({
              message: "cập nhật thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại bình luận cần cập nhật",
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
  //[delete]/api/comment/delete/:id
  deleteComment: async (req, res) => {
    try {
      const checkExist = await Comment.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await Comment.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa bình luận thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại bình luận cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = commentController;
