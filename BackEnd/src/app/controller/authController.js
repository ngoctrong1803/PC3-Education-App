const bcrypt = require("bcrypt");
const saltRounds = 10; // time to encode
const User = require("../models/User");
const Token = require("../models/Token");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const authController = {
  // function hanlde register
  resgisterUser: async (req, res) => {
    let encryptedPassword = "";
    //encrypt password
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      encryptedPassword = hash;
      console.log("password encrypted:", encryptedPassword);
      const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: encryptedPassword,
        role: req.body.role,
        address: req.body.address,
        birthday: req.body.birthday,
        phone: req.body.phone,
        class: req.body.class,
      });
      console.log("user in server:", user);

      try {
        const checkUser = await User.find({ email: user.email });
        const checkPhone = await User.find({ phone: user.phone });
        if (checkUser[0]) {
          res.message = "";
          res.status(400).json({
            message: "Email đã tồn tại! vui lòng nhập email khác!",
          });
        } else if (checkPhone[0]) {
          res.status(400).json({
            message:
              "Số điện thoại đã tồn tại! vui lòng nhập số điện thoại khác!",
          });
        } else {
          const newUser = await user.save();
          res.status(201).json(newUser);
        }
      } catch (err) {
        res.status(401).json({
          message: err.message,
        });
      }
    });
  },

  // create access token
  createAccessToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_ACCESSTOKEN, {
      expiresIn: "60s",
    });
  },
  // create refresh token
  createRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_REFRESHTOKEN, {
      expiresIn: "3600s",
    });
  },

  /**
   * store token
   * 1. localstorage
   * 2. cookie
   * 3. -redux -> access token
   *    -httponly cookies -> refresh token
   */

  //function hadle login
  loginUser: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
      email: email,
    })
      .then((data) => {
        if (data == null) {
          res.status(400).json({
            message: "Tài khoảng không tồn tại",
          });
        } else {
          bcrypt.compare(password, data.password).then((result) => {
            if (result) {
              const dataSendToClient = {
                _id: data._id,
                email: data.email,
                fullname: data.fullname,
                role: data.role,
              };
              const accesstoken =
                authController.createAccessToken(dataSendToClient);
              const refreshToken =
                authController.createRefreshToken(dataSendToClient);
              const tokenInModel = new Token({
                refreshtoken: refreshToken,
              });
              tokenInModel.save();
              //   res.cookie("refreshtoken", refreshToken, {
              //     httpOnly: true,
              //     secure: false,
              //     path: "/",
              //     sameSite: "strict",
              //   });
              res.status(200).json({
                message: "đăng nhập thành công",
                accesstoken: accesstoken,
                refreshtoken: refreshToken,
              });
            } else {
              res.status(400).json({
                message: "mật khẩu không đúng",
              });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "lỗi serer!",
        });
      });
  },
  requestRefreshToken: async (req, res) => {
    //take refresh token from browser
    //const refreshtoken = req.cookies.refreshtoken;
    console.log(
      "-------------------------refresh token--------------------------"
    );
    const refreshtoken = req.headers.cookies;
    console.log(refreshtoken);
    if (!refreshtoken) {
      res.status(401).json({
        message: "bạn chưa đăng nhập",
      });
    }
    const checkToken = await Token.findOne({ refreshtoken: refreshtoken });
    if (!checkToken) {
      return res.status(403).json("refresh token không hợp lệ");
    }
    jwt.verify(
      refreshtoken,
      process.env.JWT_KEY_REFRESHTOKEN,
      async (err, payload) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        const { iat, exp, ...others } = payload;
        const user = others;
        await Token.deleteOne({ refreshtoken: refreshtoken });
        const newAccessToken = authController.createAccessToken(user);
        const newResfreshToken = authController.createRefreshToken(user);
        const newTokenInModel = new Token({
          refreshtoken: newResfreshToken,
        });
        newTokenInModel.save();
        //   res.cookie("refreshtoken", refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     path: "/",
        //     sameSite: "strict",
        //   });
        res.status(200).json({
          accesstoken: newAccessToken,
          refreshtoken: newResfreshToken,
        });
      }
    );
  },
  logoutUser: async (req, res) => {
    console.log("đã vào logout");
    res.clearCookie("refreshtoken");
    const refreshtoken = req.headers.cookies;
    //delete refresh cookie in database
    await Token.deleteOne({ refreshtoken: refreshtoken });
  },
};
module.exports = authController;
