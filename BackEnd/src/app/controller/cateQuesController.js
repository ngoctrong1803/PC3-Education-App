const CategoryQuestion = require("../models/CategoryQuestion");
const cateQuesController = {
  //[get]/api/category-question/list
  getCateQuestion: async (req, res) => {
    const listCateQuestion = await CategoryQuestion.find({});
    res.status(200).json({
      message: "lấy thể loại câu hỏi forum thành công",
      listCateQuestion: listCateQuestion,
    });
  },
  //[post]/api/category-question/create
  createCateQuestion: async (req, res) => {
    const { catQueName, description } = req.body;
    const checkCateQuestion = await CategoryQuestion.findOne({
      catQueName: catQueName,
      description: description,
    });
    if (checkCateQuestion) {
      res.status(400).json({
        message: "thể loại câu hỏi forum này đã tồn tại",
      });
    } else {
      const newCateQuestion = new CategoryQuestion({
        catQueName: catQueName,
        description: description,
      });
      newCateQuestion.save();
      res.status(200).json({
        message: "thêm thể loại câu hỏi forum thành công",
      });
    }
  },
  //[put]/api/category-question/update/:id
  updateCateQuestion: async (req, res) => {
    const { catQueName, description } = req.body;
    const checkCateQuestion = await CategoryQuestion.findOne({
      catQueName: catQueName,
      description: description,
    });
    if (checkCateQuestion) {
      res.status(400).json({
        message: "thể loại câu hỏi forum này đã tồn tại",
      });
    } else {
      try {
        const checkId = await CategoryQuestion.findOne({ _id: req.params.id });
        if (checkId) {
          await CategoryQuestion.updateOne(
            { _id: req.params.id },
            { catQueName: catQueName, description: description }
          );
          res.status(200).json({
            message: "đã cập nhật thể loại câu hỏi forum thành công",
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
  //[delete]/api/category-question/delete/:id
  deleteCateQuestion: async (req, res) => {
    let cateQuestionId = req.params.id;
    try {
      let checkId = await CategoryQuestion.findById(req.params.id);
      if (checkId) {
        await CategoryQuestion.deleteOne({ _id: cateQuestionId });
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
module.exports = cateQuesController;
