const Report = require("../models/Report");
const reportController = {
  //[get]/api/report/list
  getReport: async (req, res) => {
    const listReport = await Report.find({});
    res.status(200).json({
      message: "lấy Report thành công",
      listReport: listReport,
    });
  },
  //[post]/api/report/create
  createReport: async (req, res) => {
    const { content, summary, userID } = req.body;
    const checkReport = await Report.findOne({
      content: content,
      summary: summary,
      userID: userID,
    });
    if (checkReport) {
      res.status(400).json({
        message: "Report này đã tồn tại",
      });
    } else {
      const newReport = new Report({
        content: content,
        summary: summary,
        userID: userID,
      });
      newReport.save();
      res.status(200).json({
        message: "thêm Report thành công",
      });
    }
  },
  //[put]/api/Report/update/:id
  updateReport: async (req, res) => {
    const { content, summary, userID } = req.body;
    const checkReport = await Report.findOne({
      content: content,
      summary: summary,
      userID: userID,
    });
    if (checkReport) {
      res.status(400).json({
        message: "Report này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Report.findOne({ _id: req.params.id });
        if (checkId) {
          await Report.updateOne(
            { _id: req.params.id },
            { content: content, summary: summary, userID: userID }
          );
          res.status(200).json({
            message: "đã cập nhật Report thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại Report bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/Report/delete/:id
  deleteReport: async (req, res) => {
    let ReportId = req.params.id;
    try {
      let checkId = await Report.findById(ReportId);
      if (checkId) {
        await Report.deleteOne({ _id: ReportId });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm Report cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm Report cần xóa",
      });
    }
  },
};
module.exports = reportController;
