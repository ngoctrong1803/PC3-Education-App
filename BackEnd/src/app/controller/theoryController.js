const Theory = require("../models/Theory");
const Lession = require("../models/Lession");
const Unit = require("../models/Unit");
const Subject = require("../models/Subject");
const theoryController = {
  //[get]/api/theory/list-theory
  getTheory: async (req, res) => {
    const listTheory = await Theory.find({});
    res.status(200).json({
      message: "lấy lý thuyết thành công",
      listTheory: listTheory,
    });
  },
  //[get]/api/lession/:id
  getContentOfTheory: async (req, res) => {
    const theory = await TheoryfindOne({ _id: req.params.id });
    const lession = await Lession.findOne({ _id: theory.lessionID });
    const unitOfLession = await Unit.findOne({ _id: lession.unitID });
    const subejctOfUnit = await Subject.findOne({
      _id: unitOfLession.subjectID,
    });
    res.status(200).json({
      message: "đã lấy nội dung môn học thành công",
      theory,
      lession,
      unitOfLession,
      subejctOfUnit,
    });
  },
  //[post]/api/theory/create
  createTheory: async (req, res) => {
    const { content, lessionID } = req.body;
    const checkTheory = await Theory.findOne({
      lessionID: lessionID,
    });
    if (checkTheory) {
      res.status(400).json({
        message: "nội dung của bài học này đã tồn tại",
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
