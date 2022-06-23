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
      const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: encryptedPassword,
        role: req.body.role,
        address: req.body.address,
        birthday: req.body.birthday,
        phone: req.body.phone,
        class: req.body.class,
        avatar: req.body.avatar,
      });
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
      expiresIn: "900s",
    });
  },
  // create refresh token
  createRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_REFRESHTOKEN, {
      expiresIn: "3600000s",
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
            message: "Tài khoản không tồn tại",
          });
        } else {
          bcrypt.compare(password, data.password).then((result) => {
            if (result) {
              const dataSendToClient = {
                _id: data._id,
                email: data.email,
                fullname: data.fullname,
                role: data.role,
                avatar: data.avatar,
                class: data.class,
                birthday: data.birthday,
                address: data.address,
                phone: data.phone,
              };
              const accesstoken =
                authController.createAccessToken(dataSendToClient);
              const refreshToken =
                authController.createRefreshToken(dataSendToClient);
              //------------------ save token in server --------------------
              // const tokenInModel = new Token({
              //   refreshtoken: refreshToken,
              // });
              // tokenInModel.save();
              // ------------------------------------------------------------
              res.status(200).json({
                message: "đăng nhập thành công",
                userInfor: dataSendToClient,
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
    console.log("================refresh token server========================");
    let refreshtoken = req.headers.refreshtoken;
    console.log("token nhận được:", req.headers.refreshtoken);
    refreshtoken = refreshtoken.split(" ")[1];
    if (!refreshtoken) {
      res.status(401).json({
        message: "bạn chưa đăng nhập",
      });
    }
    // const checkToken = await Token.findOne({ refreshtoken: refreshtoken });
    // if (!checkToken) {
    //   return res.status(403).json("refresh token không hợp lệ");
    // }
    jwt.verify(
      refreshtoken,
      process.env.JWT_KEY_REFRESHTOKEN,
      async (err, payload) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        const { iat, exp, ...others } = payload;
        console.log("user refresh", payload);
        const user = others;
        // await Token.deleteOne({ refreshtoken: refreshtoken });
        const newAccessToken = authController.createAccessToken(user);
        const newResfreshToken = authController.createRefreshToken(user);
        // ----------------- save token in server -----------------------
        // const newTokenInModel = new Token({
        //   refreshtoken: newResfreshToken,
        // });
        // newTokenInModel.save();
        // ---------------------------------------------------------------
        res.status(200).json({
          accesstoken: newAccessToken,
          refreshtoken: newResfreshToken,
        });
      }
    );
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshtoken");
    const refreshtoken = req.headers.cookies;
    //delete refresh cookie in database
    await Token.deleteOne({ refreshtoken: refreshtoken });
  },
  changePassword: async (req, res) => {
    // try {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;
    const userID = req.params.id;
    const user = await User.findOne({ _id: userID });
    if (user) {
      if (newPassword == confirmNewPassword) {
        const result = await bcrypt.compare(currentPassword, user.password);
        if (result) {
          bcrypt
            .hash(newPassword, saltRounds, async function (err, hash) {
              try {
                const encryptedPassword = hash;
                await User.updateOne(
                  { _id: userID },
                  {
                    password: encryptedPassword,
                  }
                );
                res.status(200).json({
                  message: "Đổi mật khẩu thành công",
                });
              } catch (error) {
                res.status(500).json({
                  message: "Lỗi server!",
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                message: "lỗi serer!",
              });
            });
        } else {
          res.status(400).json({
            message: "Mật khẩu cũ không đúng",
          });
        }
      } else {
        res.status(400).json({
          message: "Mật khẩu mới không trùng khớp",
        });
      }
    } else {
      res.status(400).json({
        message: "Không tìm thấy người dùng cần thay đổi mật khẩu",
      });
    }
    // } catch (error) {
    //   res.status(400).json({
    //     message: "Đã xảy ra ngoại lệ",
    //   });
    // }
  },
};
module.exports = authController;
