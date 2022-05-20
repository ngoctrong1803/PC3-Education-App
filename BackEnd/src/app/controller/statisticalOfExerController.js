const StatisticalOfExercise = require("../models/StatisticalOfExercise");
const ResultOfExercise = require("../models/ResultOfExercise");
const User = require("../models/User");
const MCExercise = require("../models/MCExercise");
const Lession = require("../models/Lession");
const Unit = require("../models/Unit");
const Subject = require("../models/Subject");
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
    try {
      const { userID, lessionID } = req.body;
      const statisticalOfExercise = await StatisticalOfExercise.findOne({
        userID,
        lessionID,
      });
      const user = await User.findOne({ _id: userID });
      const userInfor = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        address: user.address,
        birthday: user.birthday,
        phone: user.phone,
        class: user.class,
      };
      res.status(200).json({
        message: "đã truy cập thành công",
        statisticalOfExercise: statisticalOfExercise,
        userInfor: userInfor,
      });
    } catch (err) {
      res.status(400).json({
        message: "Đã xảy ra ngoại lệ",
      });
    }
  },
  //[post]/api/statistical-of-exercise/delete/by-user-and-lession
  getStatisticalOfExerciseByUserAndSubject: async (req, res) => {
    //try {
    const { userID, subjectID } = req.body;

    const subject = await Subject.findOne({ _id: subjectID });
    const listUnit = await Unit.find({ subjectID: subject._id });
    const unitIDArray = listUnit.map((_id) => {
      return _id;
    });
    const listLession = await Lession.find({ unitID: { $in: unitIDArray } });
    const lessionIDArray = listLession.map((_id) => {
      return _id;
    });

    const statisticalOfExercises = await StatisticalOfExercise.find({
      userID: userID,
      lessionID: { $in: lessionIDArray },
    });

    let totalScore = 0;
    let totalLessionDone = statisticalOfExercises.length;
    let totalLession = listLession.length;
    statisticalOfExercises.map((statisItem, index) => {
      totalScore = totalScore + statisItem.score;
    });

    const user = await User.findOne({ _id: userID });
    const userInfor = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      address: user.address,
      birthday: user.birthday,
      phone: user.phone,
      class: user.class,
    };
    res.status(200).json({
      message: "đã truy cập thành công",
      statisticalOfExercises: statisticalOfExercises,
      totalScore: totalScore,
      percentDone: Math.floor((totalLessionDone / totalLession) * 100),
      totalLessionDone: totalLessionDone,
      totalLession: totalLession,
      userInfor: userInfor,
    });
    // } catch (err) {
    //   res.status(400).json({
    //     message: "Đã xảy ra ngoại lệ",
    //   });
    // }
  },
  //[get]/api/statistical-of-exercise/user/:id
  getStatisticalOfExerciseByUser: async (req, res) => {
    try {
      const userID = req.params.id;
      //list statistical
      const listStatistical = await StatisticalOfExercise.find({
        userID: userID,
      });
      const lessionIDArray = listStatistical.map(({ lessionID }) => {
        return lessionID;
      });
      //list lession
      const listLession = await Lession.find({ _id: { $in: lessionIDArray } });
      const unitIDArray = listLession.map(({ unitID }) => {
        return unitID;
      });
      //list unit
      const listUnit = await Unit.find({ _id: { $in: unitIDArray } });
      const subjectIDArray = listUnit.map(({ subjectID }) => {
        return subjectID;
      });
      //list subject
      const listSubject = await Subject.find({ _id: { $in: subjectIDArray } });

      res.status(200).json({
        message: "Lấy thống kê thành công",
        listStatistical,
        listLession,
        listUnit,
        listSubject,
      });
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
  //[get]/api/statistical-of-exercise/lession/:id
  getStatisticalOfExerciseByLession: async (req, res) => {
    try {
      const lessionID = req.params.id;
      //list statistical of exercise
      const listStatisticalOfExercise = await StatisticalOfExercise.find({
        lessionID: lessionID,
      });
      const userIDArray = listStatisticalOfExercise.map(({ userID }) => {
        return userID;
      });
      const statisticalIDArray = listStatisticalOfExercise.map((_id) => {
        return _id;
      });
      // list user infor
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
      //list result of exercise
      const listResultOfExercise = await ResultOfExercise.find({
        statisticalID: { $in: statisticalIDArray },
      });

      const MCExerciseIDArray = listResultOfExercise.map(({ MCExerciseID }) => {
        return MCExerciseID;
      });
      //list mcexercise have in result
      const listMCExercise = await MCExercise.find({
        _id: { $in: MCExerciseIDArray },
      });

      const statisticalOfExercise = {
        listStatisticalOfExercise,
        listUserInfor,
        listResultOfExercise,
        listMCExercise,
      };

      res.status(200).json({
        message: "Lấy thống kê thành công",
        statisticalOfExercise: statisticalOfExercise,
      });
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },

  //[get]/api/statistical-of-exercise/unit/:id
  getStatisticalOfExerciseByUnit: async (req, res) => {
    try {
      const unitID = req.params.id;
      const unitInfor = await Unit.findOne({ _id: unitID });
      const listLessionOfUnit = await Lession.find({ unitID: unitID });
      const lessionIDArray = listLessionOfUnit.map((_id) => {
        return _id;
      });

      //list statistical of exercise
      const listStatisticalOfExercise = await StatisticalOfExercise.find({
        lessionID: { $in: lessionIDArray },
      });

      const userIDArray = listStatisticalOfExercise.map(({ userID }) => {
        return userID;
      });
      // list user infor
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

      const statisticalOfExercise = {
        unitInfor,
        listLessionOfUnit,
        listStatisticalOfExercise,
        listUserInfor,
      };

      res.status(200).json({
        message: "Lấy thống kê thành công",
        statisticalOfExercise: statisticalOfExercise,
      });
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
  //[get]/api/statistical-of-exercise/unit/:id
  getStatisticalOfExerciseBySubject: async (req, res) => {
    try {
      const subjectID = req.params.id;
      // subject infor
      const subjectInfor = await Subject.findOne({ _id: subjectID });
      // list unit
      const listUnit = await Unit.find({ subjectID: subjectID });
      const unitIDArray = listUnit.map(({ _id }) => {
        return _id;
      });
      // list lession
      const listLessionOfUnit = await Lession.find({
        unitID: { $in: unitIDArray },
      });
      const lessionIDArray = listLessionOfUnit.map((_id) => {
        return _id;
      });

      //list statistical of exercise
      const listStatisticalOfExercise = await StatisticalOfExercise.find({
        lessionID: { $in: lessionIDArray },
      });

      const userIDArray = listStatisticalOfExercise.map(({ userID }) => {
        return userID;
      });
      // list user infor
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

      const statisticalOfExercise = {
        subjectInfor,
        listUnit,
        listLessionOfUnit,
        listStatisticalOfExercise,
        listUserInfor,
      };

      res.status(200).json({
        message: "Lấy thống kê thành công",
        statisticalOfExercise: statisticalOfExercise,
      });
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
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
