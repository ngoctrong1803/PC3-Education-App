const StatisticalOfExam = require("../models/StatisticalOfExam");

const statisticalOfExamController = {
  //[get]/api/statistical-of-exam/list
  getStatisticalOfExam: async (req, res) => {
    const listStatisticalOfExam = await StatisticalOfExam.find({});
    res.status(200).json({
      message: "đã truy cập thành công",
      listStatisticalOfExam: listStatisticalOfExam,
    });
  },
  //[post]/api/statistical-of-exam/create
  createStatisticalOfExam: async (req, res) => {
    const { score, isDone, time, totalAnswerTrue, userID, examID } = req.body;
    const checkExist = await StatisticalOfExam.findOne({
      score: score,
      isDone: isDone,
      time: time,
      totalAnswerTrue: totalAnswerTrue,
      userID: userID,
      examID: examID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "đã tồn tại thống kê",
      });
    } else {
      const newStatisticalOfExam = new StatisticalOfExam({
        score: score,
        isDone: isDone,
        time: time,
        totalAnswerTrue: totalAnswerTrue,
        userID: userID,
        examID: examID,
      });
      newStatisticalOfExam.save();
      res.status(200).json({
        message: "tạo mới thành công",
        statisticalOfExam: newStatisticalOfExam,
      });
    }
  },
  //[put]/api/statistical-of-exam/update/:id
  updateStatisticalOfExam: async (req, res) => {
    const { score, isDone, time, totalAnswerTrue, userID, examID } = req.body;
    const checkExist = await StatisticalOfExam.findOne({
      score: score,
      isDone: isDone,
      time: time,
      totalAnswerTrue: totalAnswerTrue,
      userID: userID,
      examID: examID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "đã tồn tại thống kê",
      });
    } else {
      try {
        const checkId = await StatisticalOfExam.findOne({
          _id: req.params.id,
        });
        if (checkId) {
          await StatisticalOfExam.updateOne(
            {
              _id: req.params.id,
            },
            {
              score: score,
              isDone: isDone,
              time: time,
              totalAnswerTrue: totalAnswerTrue,
              userID: userID,
              examID: examID,
            }
          );
          res.status(200).json({
            message: "cập nhật thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại thống kê cần cập nhập",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/statistical-of-exam/delete/:id
  deleteStatisticalOfExam: async (req, res) => {
    try {
      const checkId = await StatisticalOfExam.findOne({
        _id: req.params.id,
      });
      if (checkId) {
        await StatisticalOfExam.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại thống kê cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = statisticalOfExamController;
