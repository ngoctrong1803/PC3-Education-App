const { status } = require("express/lib/response");
const User = require("../models/User");
const userController = {
  //[get]/api/user/list-user
  getUser: async (req, res) => {
    const listUser = await User.find({});
    res.status(200).json({
      message: "lấy danh sách người dùng thành công",
      listUser: listUser,
    });
  },
};
module.exports = userController;
