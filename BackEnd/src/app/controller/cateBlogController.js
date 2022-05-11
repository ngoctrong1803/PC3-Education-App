const CategoryBlog = require("../models/CategoryBlog");
const Blog = require("../models/Blog");
const cateBlogController = {
  //[get]/api/category-blog/list
  getCateBlog: async (req, res) => {
    const listCateBlog = await CategoryBlog.find({});
    res.status(200).json({
      message: "lấy thể loại Blog thành công",
      listCateBlog: listCateBlog,
    });
  },
  //[post]/api/category-blog/create
  createCateBlog: async (req, res) => {
    const { category } = req.body;
    const checkCateBlog = await CategoryBlog.findOne({
      category: category,
    });
    if (checkCateBlog) {
      res.status(400).json({
        message: "thể loại Blog này đã tồn tại",
      });
    } else {
      const newCateBlog = new CategoryBlog({
        category: category,
      });
      newCateBlog.save();
      res.status(200).json({
        message: "thêm thể loại Blog thành công",
      });
    }
  },
  //[put]/api/category-Blogcise/update/:id
  updateCateBlog: async (req, res) => {
    const { category } = req.body;
    const checkCateBlog = await CategoryBlog.findOne({
      category: category,
    });
    if (checkCateBlog) {
      res.status(400).json({
        message: "thể loại Blog này đã tồn tại",
      });
    } else {
      try {
        const checkId = await CategoryBlog.findOne({ _id: req.params.id });
        if (checkId) {
          await CategoryBlog.updateOne(
            { _id: req.params.id },
            { category: category }
          );
          res.status(200).json({
            message: "đã cập nhật thể loại Blog thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại thể loại bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại thể loại bạn muốn cập nhật",
        });
      }
    }
  },
  //[delete]/api/category-Blogcise/delete/:id
  deleteCateBlog: async (req, res) => {
    let cateBlogId = req.params.id;
    try {
      let checkId = await CategoryBlog.findById(cateBlogId);
      if (checkId) {
        await Blog.deleteMany({ cateBlogID: cateBlogId });
        await CategoryBlog.deleteOne({ _id: cateBlogId });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm thấy thể loại cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm thấy thể loại cần xóa",
      });
    }
  },
};
module.exports = cateBlogController;
