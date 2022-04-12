const Unit = require("../models/Unit");

const unitController = {
  //[get]/api/unit/list-unit
  getUnit: async (req, res) => {
    const listUnit = await Unit.find({});
    res.status(200).json({
      message: "lấy unit thành công",
      listUnit: listUnit,
    });
  },
  //[post]/api/unit/create
  createUnit: async (req, res) => {
    const { unitName, subjectID } = req.body;
    const checkUnit = await Unit.findOne({
      unitName: unitName,
      subjectID: subjectID,
    });
    if (checkUnit) {
      res.status(400).json({
        message: "chương này đã tồn tại",
      });
    } else {
      let newUnit = new Unit({
        unitName: unitName,
        subjectID: subjectID,
      });
      newUnit.save();
      res.status(200).json({
        message: "đã tạo Unit thành công",
        unit: newUnit,
      });
    }
  },
  //[put]/api/unit/update/:id
  updateUnit: async (req, res) => {
    const { unitName, subjectID } = req.body;
    const checkUnit = await Unit.findOne({
      unitName: unitName,
      subjectID: subjectID,
    });
    if (checkUnit) {
      res.status(400).json({
        message: "chương này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Unit.findOne({ _id: req.params.id });
        if (checkId) {
          await Unit.updateOne(
            { _id: req.params.id },
            {
              unitName: unitName,
              subjectID: subjectID,
            }
          );

          res.status(200).json({
            message: "đã cập nhật Unit thành công",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại unit muốn update",
        });
      }
    }
  },
  //[delete]/api/unit/delete/:id
  deleteUnit: async (req, res) => {
    try {
      const checkId = await Unit.findOne({ _id: req.params.id });
      if (checkId) {
        Unit.deleteOne({ _id: req.params.id });
        res.status(200).json({
          message: "đã xóa unit thành công",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tồn tại unit cần xóa",
      });
    }
  },
};
module.exports = unitController;