const Lession = require("../models/Lession");
const Subject = require("../models/Subject");
const Theory = require("../models/Theory");
const Unit = require("../models/Unit");
const MCExercise = require("../models/MCExercise");
const CategoryExercise = require("../models/CategoryExercise");

const lessionController = {
  //[get]/api/lession/list-lession
  getLession: async (req, res) => {
    const listLession = await Lession.find({});
    res.status(200).json({
      message: "đã lấy lession thành công",
      listLession: listLession,
    });
  },
  //[get]/api/lession/:id
  getContentLession: async (req, res) => {
    const lession = await Lession.findOne({ _id: req.params.id });
    const theory = await Theory.findOne({ lessionID: lession._id });
    const unitOfLession = await Unit.findOne({ _id: lession.unitID });
    const subjectOfUnit = await Subject.findOne({
      _id: unitOfLession.subjectID,
    });
    res.status(200).json({
      message: "đã lấy nội dung môn học thành công",
      lession,
      unitOfLession,
      subjectOfUnit,
      theory,
    });
  },
  //[get]/api/mcexercise/mcexercise-by-lession/:id
  getMCExerciseOfLession: async (req, res) => {
    const lession = await Lession.findOne({ _id: req.params.id });
    const listMCExercise = await MCExercise.find({
      lessionID: lession._id,
    });
    const MCExerciseIDArray = listMCExercise.map(({ _id }) => _id);
    const listCatExe = await CategoryExercise.find({
      _id: { $in: MCExerciseIDArray },
    });
    res.status(200).json({
      message: "đã lấy nội dung môn học thành công",
      lession,
      listMCExercise,
      listCatExe,
    });
  },
  //[post]/api/lession/create
  createLession: async (req, res) => {
    const { lessionName, unitID, lessionNumber } = req.body;
    const checkLession = await Lession.findOne({
      lessionName: lessionName,
      unitID: unitID,
      lessionNumber: lessionNumber,
    });
    if (checkLession) {
      res.status(400).json({
        message: "bài học này đã tồn tại",
      });
    } else {
      let newLession = new Lession({
        lessionName: lessionName,
        unitID: unitID,
        lessionNumber: lessionNumber,
      });
      newLession.save();
      res.status(200).json({
        message: "đã tạo bài học mới thành công",
        lesion: newLession,
      });
    }
  },
  //[put]/api/lession/update/:id
  updateLession: async (req, res) => {
    const { lessionName, unitID, lessionNumber } = req.body;
    const checkLession = await Lession.findOne({
      lessionName: lessionName,
      unitID: unitID,
      lessionNumber: lessionNumber,
    });
    if (checkLession) {
      res.status(400).json({
        message: "bài học này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Lession.findOne({ _id: req.params.id });
        if (checkId) {
          await Lession.updateOne(
            { _id: req.params.id },
            {
              lessionName: lessionName,
              unitID: unitID,
              lessionNumber: lessionNumber,
            }
          );
          res.status(200).json({
            message: "đã cập nhật bài học thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại bài học cần update",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại bài học muốn update",
        });
      }
    }
  },
  //[delete]/api/lession/delete/:id
  deleteLession: async (req, res) => {
    try {
      const checkId = await Lession.findOne({ _id: req.params.id });
      if (checkId) {
        await Lession.deleteOne({ _id: req.params.id });
        res.status(200).json({
          message: "đã xóa bài học thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại bài học cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tồn tại bài học cần xóa",
      });
    }
  },
};
module.exports = lessionController;
