const CommentLike = require("../models/CommentLike");

const commentLikeController = {
  //[get]/api/comment-like/list
  getCommentLike: async (req, res) => {
    const listCommentLike = await CommentLike.find({});
    res.status(200).json({
      message: "đã  comment like lấy thành công",
      listCommentLike: listCommentLike,
    });
  },
  //[post]/api/comment-like/create
  createCommentLike: async (req, res) => {
    const { userID, commentID } = req.body;
    if (userID == null || commentID == null) {
      res.status(200).json({
        message: "vui lòng điền đầy đủ thông tin của CommentLike",
      });
    } else {
      const checkExist = await CommentLike.findOne({
        userID: userID,
        commentID: commentID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "CommentLike này đã tồn tại",
        });
      } else {
        const newCommentLike = new CommentLike({
          userID: userID,
          commentID: commentID,
        });
        newCommentLike.save();
        res.status(200).json({
          message: "thêm mới CommentLike",
        });
      }
    }
  },
  //[put]/api/comment-like/update/:id
  updateCommentLike: async (req, res) => {
    const { userID, commentID } = req.body;
    if (userID == null || commentID == null) {
      res.status(200).json({
        message: "vui lòng nhập đầy đủ thông tin của CommentLike",
      });
    } else {
      const checkExist = await CommentLike.findOne({
        userID: userID,
        commentID: commentID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "CommentLike này đã tồn tại",
        });
      } else {
        try {
          const checkId = await CommentLike.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await CommentLike.updateOne(
              { _id: req.params.id },
              {
                userID: userID,
                commentID: commentID,
              }
            );
            res.status(200).json({
              message: "cập nhật CommentLike thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại CommentLike cần cập nhật",
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
  //[delete]/api/comment-like/delete/:id
  deleteCommentLike: async (req, res) => {
    try {
      const checkExist = await CommentLike.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await CommentLike.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa CommentLike thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại CommentLike cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = commentLikeController;
