const { status } = require("express/lib/response");
const User = require("../models/User");
const Blog = require("../models/Blog");
const Report = require("../models/Report");
const Flashcard = require("../models/Flashcard");
const Comment = require("../models/Comment");
const CommentLike = require("../models/CommentLike");
const QuestionInForum = require("../models/QuestionInForum");
const QuestionLike = require("../models/QuestionLike");
const StatisticalOfExam = require("../models/StatisticalOfExam");
const ResultOfExam = require("../models/ResultOfExam");
const StatisticalOfExercise = require("../models/StatisticalOfExercise");
const ResultOfExercise = require("../models/ResultOfExercise");

const userController = {
  //[get]/api/user/list-user
  getUser: async (req, res) => {
    const listUser = await User.find({});
    const listUserToClient = listUser.map((userItem, index) => {
      return {
        _id: userItem._id,
        fullname: userItem.fullname,
        email: userItem.email,
        role: userItem.role,
        address: userItem.address,
        birthday: userItem.birthday,
        phone: userItem.phone,
        class: userItem.class,
        avatar: userItem.avatar,
      };
    });
    res.status(200).json({
      message: "lấy danh sách người dùng thành công",
      listUser: listUserToClient,
    });
  },
  getUserByID: async (req, res) => {
    try {
      const userID = req.params.id;
      const user = await User.findOne({ _id: userID });
      const userToClient = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        address: user.address,
        birthday: user.birthday,
        phone: user.phone,
        class: user.class,
        avatar: user.avatar,
      };
      if (user._id) {
        res.status(200).json({
          message: "Lấy thông tin người dùng thành công",
          user: userToClient,
        });
      } else {
        res.status(400).json({
          message: "Không tìm thấy người dùng",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Id không đúng định dạng",
      });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const userID = req.params.id;
      const { imageurl } = req.body;
      const checkUser = await User.findOne({ _id: userID });
      if (checkUser) {
        await User.updateOne(
          { _id: userID },
          {
            avatar: imageurl,
          }
        );
        res.status(200).json({
          message: "Cập nhật avatar thành công",
        });
      } else {
        res.status(400).json({
          message: "Không tồn tại người dùng cần update",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Lỗi cập nhật avatar",
      });
    }
  },
  updateUserInfor: async (req, res) => {
    try {
      const userID = req.params.id;
      const { userAddress, userClass, userPhone } = req.body;
      const checkUser = await User.findOne({ _id: userID });
      if (checkUser) {
        const checkPhone = await User.findOne({ phone: userPhone });
        if (checkPhone && checkPhone?._id != userID) {
          res.status(401).json({
            message: "Số điện thoại đã tồn tại",
          });
        } else {
          await User.updateOne(
            { _id: userID },
            {
              address: userAddress,
              class: userClass,
              phone: userPhone,
            }
          );
          const user = await User.findOne({ _id: userID });
          const userUpdate = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            address: user.address,
            birthday: user.birthday,
            phone: user.phone,
            class: user.class,
            avatar: user.avatar,
          };
          res.status(200).json({
            message: "Cập nhật thông tin thành công",
            userUpdate: userUpdate,
          });
        }
      } else {
        res.status(401).json({
          message: "Không tồn tại người dùng cần cập nhật",
        });
      }
    } catch (error) {
      res.status(402).json({
        message: "Lỗi cập nhật thông tin người dùng",
      });
    }
  },
  deleteUser: async (req, res) => {
    const userID = req.params.id;
    console.log("userID", userID);
    const userToDelete = await User.findOne({ _id: userID });
    console.log("userToDelete", userToDelete);
    if (userToDelete._id) {
      //delete blog
      await Blog.deleteMany({ userID: userID });
      //delete report
      await Report.deleteMany({ userID: userID });
      //delete flashcard
      await Flashcard.deleteMany({ userID: userID });
      //delete comment
      await Comment.deleteMany({ userID: userID });
      //delete comment like
      await CommentLike.deleteMany({ userID: userID });
      //delete question in forum
      await QuestionInForum.deleteMany({ userID: userID });
      //delete question like
      await QuestionLike.deleteMany({ userID: userID });

      const listStatisticalOfExam = await StatisticalOfExam.find({
        userID: userID,
      });
      const statisticalOfExamIDArray = listStatisticalOfExam.map(({ _id }) => {
        return _id;
      });
      //delete result of exam
      await ResultOfExam.deleteMany({
        statisticalID: { $in: statisticalOfExamIDArray },
      });
      //delete statistical of exam
      await StatisticalOfExam.deleteMany({ userID: userID });

      const listStatisticalOfExercise = await StatisticalOfExercise.find({
        userID: userID,
      });
      const statisticalOfExerciseIDArray = listStatisticalOfExercise.map(
        ({ _id }) => {
          return _id;
        }
      );
      //delete result of Exercise
      await ResultOfExercise.deleteMany({
        statisticalID: { $in: statisticalOfExerciseIDArray },
      });
      //delete statistical of Exercise
      await StatisticalOfExercise.deleteMany({ userID: userID });
      //delete user
      await User.deleteOne({ _id: userID });
      res.status(200).json({
        message: "xóa người dùng thành công",
      });
    } else {
      res.status(400).json({
        message: "không tồn tại người dùng cần xóa",
      });
    }
  },
};
module.exports = userController;
