const StatisticalOfExercise = require("../models/StatisticalOfExercise");
const ResultOfExercise = require("../models/ResultOfExercise");
const statisticalOfExerController = {
  //[get]/api/statistical-of-exercise/list
  getStatisticalOfExercise: async (req, res) => {
    const listStatisticalOfExercise = await StatisticalOfExercise.find({});
    res.status(200).json({
      message: "đã truy cập thành công",
      listStatisticalOfExercise: listStatisticalOfExercise,
    });
  },

  //[post]/api/statistical-of-exercise/delete/by-user-and-lession
  getStatisticalOfExerciseByUserAndLession: async (req, res) => {
    const { userID, lessionID } = req.body;
    
    const statisticalOfExercise = await StatisticalOfExercise.findOne({
      userID,
      lessionID,
    });
    res.status(200).json({
      message: "đã truy cập thành công",
      statisticalOfExercise: statisticalOfExercise,
    });
  },
  //[post]/api/statistical-of-exercise/delete/by-user-and-lession
  deleteStatisticalOfExerciseByUserAndLession: async (req, res) => {
    const { userID, lessionID } = req.body;
    const statisticalOfExercise = await StatisticalOfExercise.findOne({
      userID,
      lessionID,
    });
    if (statisticalOfExercise) {
      await ResultOfExercise.deleteMany({
        statisticalID: statisticalOfExercise._id,
      });
      await StatisticalOfExercise.deleteOne({
        userID,
        lessionID,
      });
      res.status(200).json({
        message: "xóa kết quả thành công",
      });
    } else {
      res.status(400).json({
        message: "không tồn tại kết quả cần xóa",
      });
    }
  },
  //[post]/api/statistical-of-exercise/create
  createStatisticalOfExercise: async (req, res) => {
    const { score, isDone, time, totalAnswerTrue, userID, lessionID } =
      req.body;
    const checkExist = await StatisticalOfExercise.findOne({
      userID: userID,
      lessionID: lessionID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "đã tồn tại thống kê",
      });
    } else {
      const newStatisticalOfExercise = new StatisticalOfExercise({
        score: score,
        isDone: isDone,
        time: time,
        totalAnswerTrue: totalAnswerTrue,
        userID: userID,
        lessionID: lessionID,
      });
      newStatisticalOfExercise.save();
      res.status(200).json({
        message: "tạo mới thành công",
        statisticalOfExercise: newStatisticalOfExercise,
      });
    }
  },
  //[put]/api/statistical-of-exercise/update/:id
  updateStatisticalOfExercise: async (req, res) => {
    const { score, isDone, time, totalAnswerTrue, userID, lessionID } =
      req.body;
    const checkExist = await StatisticalOfExercise.findOne({
      score: score,
      isDone: isDone,
      time: time,
      totalAnswerTrue: totalAnswerTrue,
      userID: userID,
      lessionID: lessionID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "đã tồn tại thống kê",
      });
    } else {
      try {
        const checkId = await StatisticalOfExercise.findOne({
          _id: req.params.id,
        });
        if (checkId) {
          await StatisticalOfExercise.updateOne(
            {
              _id: req.params.id,
            },
            {
              score: score,
              isDone: isDone,
              time: time,
              totalAnswerTrue: totalAnswerTrue,
              userID: userID,
              lessionID: lessionID,
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
  //[delete]/api/statistical-of-exercise/delete/:id
  deleteStatisticalOfExercise: async (req, res) => {
    try {
      const checkId = await StatisticalOfExercise.findOne({
        _id: req.params.id,
      });
      if (checkId) {
        await StatisticalOfExercise.deleteOne({
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
module.exports = statisticalOfExerController;
