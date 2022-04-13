const ExamType = require("../models/ExamType");
const examTypeController = {
  //[get]/api/category-exercise/list
  getExamType: async (req, res) => {
    const listExamType = await ExamType.find({});
    res.status(200).json({
      message: "lấy thể loại bài kiểm tra thành công",
      listExamType: listExamType,
    });
  },
  //[post]/api/category-exercise/create
  createExamType: async (req, res) => {
    const { typeName, description } = req.body;
    const checkExamType = await ExamType.findOne({
      typeName: typeName,
      description: description,
    });
    if (checkExamType) {
      res.status(400).json({
        message: "thể loại bài kiểm tra này đã tồn tại",
      });
    } else {
      const newExamType = new ExamType({
        typeName: typeName,
        description: description,
      });
      newExamType.save();
      res.status(200).json({
        message: "thêm thể loại bài kiểm tra thành công",
      });
    }
  },
  //[put]/api/category-exercise/update/:id
  updateExamType: async (req, res) => {
    const { typeName, description } = req.body;
    const checkExamType = await ExamType.findOne({
      typeName: typeName,
      description: description,
    });
    if (checkExamType) {
      res.status(400).json({
        message: "thể loại bài kiểm tra này đã tồn tại",
      });
    } else {
      try {
        const checkId = await ExamType.findOne({ _id: req.params.id });
        if (checkId) {
          await ExamType.updateOne(
            { _id: req.params.id },
            { typeName: typeName, description: description }
          );
          res.status(200).json({
            message: "đã cập nhật thể loại bài kiểm tra thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại thể loại bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không đúng định dạng",
        });
      }
    }
  },
  //[delete]/api/category-exercise/delete/:id
  deleteExamType: async (req, res) => {
    let ExamTypeId = req.params.id;
    try {
      let checkId = await ExamType.findById(req.params.id);
      if (checkId) {
        await ExamType.deleteOne({ _id: ExamTypeId });
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
module.exports = examTypeController;
