const Theory = require("../models/Theory");
const theoryController = {
  //[get]/api/theory/list-theory
  getTheory: async (req, res) => {
    const listTheory = await Theory.find({});
    res.status(200).json({
      message: "lấy lý thuyết thành công",
      listTheory: listTheory,
    });
  },
  //[post]/api/theory/create
  createTheory: async (req, res) => {
    const { content, lessionID } = req.body;
    const checkTheory = await Theory.findOne({
      content: content,
      lessionID: lessionID,
    });
    if (checkTheory) {
      res.status(400).json({
        message: "nội dung này đã tồn tại",
      });
    } else {
      let newTheory = new Theory({
        content: content,
        lessionID: lessionID,
      });
      newTheory.save();
      res.status(200).json({
        message: "đã tạo lý thuyết thành công",
        theory: newTheory,
      });
    }
  },
  //[put]/api/theory/update/:id
  updateTheory: async (req, res) => {
    const { content, lessionID } = req.body;
    const checkTheory = await Theory.findOne({
      content: content,
      lessionID: lessionID,
    });
    if (checkTheory) {
      res.status(400).json({
        message: "lý thuyết này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Theory.findOne({ _id: req.params.id });
        if (checkId) {
          await Theory.updateOne(
            { _id: req.params.id },
            {
              content: content,
              lessionID: lessionID,
            }
          );
          res.status(200).json({
            message: "đã cập nhật lý thuyết thành công",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại lý thuyết muốn update",
        });
      }
    }
  },
  //[delete]/api/theory/delete/:id
  deleteTheory: async (req, res) => {
    try {
      const checkId = await Theory.findOne({ _id: req.params.id });
      if (checkId) {
        Theory.deleteOne({ _id: req.params.id });
        res.status(200).json({
          message: "đã xóa lý thuyết thành công",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tồn tại lý thuyết cần xóa",
      });
    }
  },
};
module.exports = theoryController;
