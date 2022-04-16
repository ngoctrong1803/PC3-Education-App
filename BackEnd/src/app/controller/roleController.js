const Role = require("../models/Role");
const roleController = {
  //[get]/api/role/list
  getRole: async (req, res) => {
    const listRole = await Role.find({});
    res.status(200).json({
      message: "lấy quyền thành công",
      listRole: listRole,
    });
  },
  //[post]/api/role/create
  createRole: async (req, res) => {
    const { roleName, description } = req.body;
    const checkRole = await Role.findOne({
      roleName: roleName,
      description: description,
    });
    if (checkRole) {
      res.status(400).json({
        message: "quyền này đã tồn tại",
      });
    } else {
      const newRole = new Role({
        roleName: roleName,
        description: description,
      });
      newRole.save();
      res.status(200).json({
        message: "thêm quyền thành công",
      });
    }
  },
  //[put]/api/role/update/:id
  updateRole: async (req, res) => {
    const { roleName, description } = req.body;
    const checkRole = await Role.findOne({
      roleName: roleName,
      description: description,
    });
    if (checkRole) {
      res.status(400).json({
        message: "quyền này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Role.findOne({ _id: req.params.id });
        if (checkId) {
          await Role.updateOne(
            { _id: req.params.id },
            { roleName: roleName, description: description }
          );
          res.status(200).json({
            message: "đã cập nhật quyền thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại quyền bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/role/delete/:id
  deleteRole: async (req, res) => {
    let RoleId = req.params.id;
    try {
      let checkId = await Role.findById(RoleId);
      if (checkId) {
        await Role.deleteOne({ _id: RoleId });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm quyền cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm quyền cần xóa",
      });
    }
  },
};
module.exports = roleController;
