const Lession = require("../models/Lession");

const lessionController = {
  //[get]/api/lession/list-lession
  getLession: async (req, res) => {
    const listLession = await Lession.find({});
    res.status(200).json({
      message: "đã lấy lession thành công",
      listLession: listLession,
    });
  },
  //[post]/api/lession/create
  createLession: async (req, res) => {
    const { lessionName, initID } = req.body;
    const checkLession = await Lession.findOne({
      lessionName: lessionName,
      initID: initID,
    });
    if (checkLession) {
      res.status(400).json({
        message: "bài học này đã tồn tại",
      });
    } else {
      let newLession = new Lession({
        lessionName: lessionName,
        initID: initID,
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
    const { lessionName, unitID } = req.body;
    const checkLession = await Lession.findOne({
      lessionName: lessionName,
      unitID: unitID,
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
            }
          );
          res.status(200).json({
            message: "đã cập nhật bài học thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại bài học cần xóa",
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
        Lession.deleteOne({ _id: req.params.id });
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
