const StatisticalOfExam = require("../models/StatisticalOfExam");
const ResultOfExam = require("../models/ResultOfExam");
const Exam = require("../models/Exam");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ExamQuestion = require("../models/ExamQuestion");
const User = require("../models/User");

const statisticalOfExamController = {
  //[get]/api/statistical-of-exam/list
  getStatisticalOfExam: async (req, res) => {
    const listStatisticalOfExam = await StatisticalOfExam.find({});
    res.status(200).json({
      message: "đã truy cập thành công",
      listStatisticalOfExam: listStatisticalOfExam,
    });
  },
  //[post]/api/statistical-of-exam/get-by-user-and-exam
  getStatisticalOfExamByUserAndExam: async (req, res) => {
    const { userID, examID } = req.body;
    const statistical = await StatisticalOfExam.findOne({
      userID: userID,
      examID: examID,
    });
    if (statistical) {
      res.status(200).json({
        message: "lấy kết quả thành công",
        statistical,
      });
    } else {
      res.status(400).json({
        message: "không tìm thấy kết quả",
      });
    }
  },
  getStatisticalByExamID: async (req, res) => {
    try {
      const examID = req.params.id;
      const listStatisticalOfExam = await StatisticalOfExam.find({
        examID: examID,
      });
      const statisticalIDArray = listStatisticalOfExam.map(({ _id }) => {
        return _id;
      });
      const userIDArray = listStatisticalOfExam.map(({ userID }) => {
        return userID;
      });
      const listUserTemp = await User.find({ _id: { $in: userIDArray } });
      const listUserInfor = listUserTemp.map((item, index) => {
        return {
          _id: item._id,
          fullname: item.fullname,
          email: item.email,
          role: item.role,
          address: item.address,
          birthday: item.birthday,
          phone: item.phone,
          class: item.class,
        };
      });
      const listResultOfExam = await ResultOfExam.find({
        statisticalID: { $in: statisticalIDArray },
      });
      const listExamQuestion = await ExamQuestion.find({ examID: examID });

      const dataToClient = {
        listUserInfor,
        listStatisticalOfExam,
        listResultOfExam,
        listExamQuestion,
      };
      res.status(200).json({
        message: "Lấy thống kê thành công",
        statisticalOfExam: dataToClient,
      });
    } catch (error) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
  getStatisticalResultAllExam: async (req, res) => {
    try {
      const listStatistical = await StatisticalOfExam.aggregate([
        {
          $group: {
            // group by
            _id: "$userID",
            totalScore: { $sum: "$score" },
            totalTime: { $sum: "$time" },
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            // link with foreign model
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            // except property
            "user.password": 0,
          },
        },
        {
          $sort: {
            // sort
            totalScore: -1,
            totalTime: 1,
          },
        },
        { $limit: 5 },
      ]);
      res.status(200).json({
        message: "Lấy danh sách thành công",
        listStatistical,
      });
    } catch (error) {
      res.status(400).json({
        message: "Đã xảy ra ngoại lệ!",
      });
    }
  },
  getStatisticalResultOfExam: async (req, res) => {
    try {
      const examID = req.params.id;
      if (Exam.findOne({ _id: examID })) {
        console.log("exam id:", examID);
        const listStatistical = await StatisticalOfExam.aggregate([
          {
            $match: { examID: ObjectId(examID) },
          },
          {
            $group: {
              // group by
              _id: "$userID",
              totalScore: { $sum: "$score" },
              totalTime: { $sum: "$time" },
              count: { $sum: 1 },
            },
          },
          {
            $lookup: {
              // link with foreign model
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              // except property
              "user.password": 0,
            },
          },
          {
            $sort: {
              // sort
              totalScore: -1,
              totalTime: 1,
            },
          },
          { $limit: 5 },
        ]);
        res.status(200).json({
          message: "Lấy danh sách thành công",
          listStatistical,
        });
      } else {
        res.status(400).json({
          message: "Bài thi không tồn tại",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
  //[post]/api/statistical-of-exam/create
  createStatisticalOfExam: async (req, res) => {
    const { score, isDone, time, totalAnswerTrue, userID, examID } = req.body;
    const checkExist = await StatisticalOfExam.findOne({
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
  //[post]/api/statistical-of-exam/delete/by-user-and-exam
  deleleStatisticalOfExamByUserAndExam: async (req, res) => {
    const { userID, examID } = req.body;
    const statistical = await StatisticalOfExam.findOne({
      userID: userID,
      examID: examID,
    });
    if (statistical) {
      try {
        console.log("statistical id:", statistical._id);
        await ResultOfExam.deleteMany({
          statisticalID: statistical._id,
        });
        await StatisticalOfExam.deleteOne({
          userID: userID,
          examID: examID,
        });
        res.status(200).json({
          message: "xóa thành công",
        });
      } catch (error) {
        res.status(400).json({
          message: "xóa thất bại",
        });
      }
    } else {
      res.status(400).json({
        message: "không tồn tại kết quả cần xóa",
      });
    }
  },
};
module.exports = statisticalOfExamController;
