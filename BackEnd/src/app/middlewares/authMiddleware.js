const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.accesstoken;
    if (token) {
      const accesstoken = token.split(" ")[1];
      jwt.verify(
        accesstoken,
        process.env.JWT_KEY_ACCESSTOKEN,
        (err, payload) => {
          if (err) {
            res.status(403).json("Token không hợp lệ");
          }
          req.data = payload;
          next();
        }
      );
    } else {
      res.status(401).json("bạn cần phải đăng nhập");
    }
  },
  checkUserChangeInfor: (req, res, next) => {
    const userID = req.params.id;
    authMiddleware.verifyToken(req, res, () => {
      if (req.data._id === userID) {
        next();
      } else {
        res.status(403).json("Token không hợp lệ");
      }
    });
  },
  checkAdmin: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.data.role === "admin" || req.data.role === "teacher") {
        next();
      } else {
        res.status(403).json("bạn không được phép truy cập");
      }
    });
  },
  checkTeacher: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.data.role === "teacher") {
        next();
      } else {
        res.status(403).json("bạn không được phép truy cập");
      }
    });
  },
};

module.exports = authMiddleware;
