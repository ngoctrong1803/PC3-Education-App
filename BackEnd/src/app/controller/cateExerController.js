const CategorryExercise = require("../models/CategoryExercise");
const cateExerController = {
  //[get]/api/category-exercise/list
  getCateExer: async (req, res) => {
    const listCateExer = await CategorryExercise.find({});
    res.status(200).json({
      message: "lấy thể loại bài tập thành công",
      listCateExer: listCateExer,
    });
  },
  //[post]/api/category-exercise/create
  createCateExer: async (req, res) => {
    const { typeName, description } = req.body;
    const checkCateExer = await CategorryExercise.findOne({
      typeName: typeName,
      description: description,
    });
    if (checkCateExer) {
      res.status(400).json({
        message: "thể loại bài tập này đã tồn tại",
      });
    } else {
      const newCateExer = new CategorryExercise({
        typeName: typeName,
        description: description,
      });
      newCateExer.save();
      res.status(200).json({
        message: "thêm thể loại bài tập thành công",
      });
    }
  },
  //[put]/api/category-exercise/update/:id
  updateCateExer: async (req, res) => {
    const { typeName, description } = req.body;
    const checkCateExer = await CategorryExercise.findOne({
      typeName: typeName,
      description: description,
    });
    if (checkCateExer) {
      res.status(400).json({
        message: "thể loại bài tập này đã tồn tại",
      });
    } else {
      try {
        const checkId = await CategorryExercise.findOne({ _id: req.params.id });
        if (checkId) {
          await CategorryExercise.updateOne(
            { _id: req.params.id },
            { typeName: typeName, description: description }
          );
          res.status(200).json({
            message: "đã cập nhật thể loại bài tập thành công",
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
  //[delete]/api/category-exercise/delete/:id
  deleteCateExer: async (req, res) => {
    let cateExerId = req.params.id;
    try {
      let checkId = await CategorryExercise.findById(req.params.id);
      if (checkId) {
        await CategorryExercise.deleteOne({ _id: cateExerId });
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
module.exports = cateExerController;
