const Blog = require("../models/Blog");

const blogController = {
  //[get]/api/blog/list
  getBlog: async (req, res) => {
    const listBlog = await Blog.find({});
    res.status(200).json({
      message: "đã lấy thành công",
      listBlog: listBlog,
    });
  },
  //[post]/api/blog/create
  createBlog: async (req, res) => {
    const { content, title, userID, cateBlogID } = req.body;
    if (
      content == null ||
      title == null ||
      userID == null ||
      cateBlogID == null
    ) {
      res.status(200).json({
        message: "vui lòng điền đầy đủ thông tin của blog",
      });
    } else {
      const checkExist = await Blog.findOne({
        content: content,
        title: title,
        userID: userID,
        cateBlogID: cateBlogID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "blog này đã tồn tại",
        });
      } else {
        const newBlog = new Blog({
          content: content,
          title: title,
          userID: userID,
          cateBlogID: cateBlogID,
        });
        newBlog.save();
        res.status(200).json({
          message: "thêm mới blog",
        });
      }
    }
  },
  //[put]/api/blog/update/:id
  updateBlog: async (req, res) => {
    const { content, title, userID, cateBlogID } = req.body;
    if (
      content == null ||
      title == null ||
      userID == null ||
      cateBlogID == null
    ) {
      res.status(200).json({
        message: "vui lòng nhập đầy đủ thông tin của blog",
      });
    } else {
      const checkExist = await Blog.findOne({
        content: content,
        title: title,
        userID: userID,
        cateBlogID: cateBlogID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "blog này đã tồn tại",
        });
      } else {
        try {
          const checkId = await Blog.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await Blog.updateOne(
              { _id: req.params.id },
              {
                content: content,
                title: title,
                userID: userID,
                cateBlogID: cateBlogID,
              }
            );
            res.status(200).json({
              message: "cập nhật blog thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại blog cần cập nhật",
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
  //[delete]/api/blog/delete/:id
  deleteBlog: async (req, res) => {
    try {
      const checkExist = await Blog.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await Blog.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa blog thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại blog cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = blogController;
