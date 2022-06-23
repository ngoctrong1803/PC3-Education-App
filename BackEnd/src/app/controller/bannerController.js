const Banner = require("../models/Banner");
const bannerController = {
  //[get]/api/banner/list
  getBanner: async (req, res) => {
    const listBanner = await Banner.find({});
    res.status(200).json({
      message: "lấy banner thành công",
      listBanner: listBanner,
    });
  },
  //[post]/api/banner/create
  createBanner: async (req, res) => {
    try {
      const { title, description, image } = req.body;
      const newBanner = new Banner({
        title: title,
        description: description,
        image: image,
        url: "",
      });
      newBanner.save();
      res.status(200).json({
        message: "thêm banner thành công",
      });
    } catch (error) {
      res.status(400).json({
        message: "Đã xảy ra ngoại lệ, thêm banner thất bại!",
      });
    }
  },
  //[put]/api/banner/update/:id
  updateBanner: async (req, res) => {
    const { title, description, image } = req.body;
    try {
      const checkId = await Banner.findOne({ _id: req.params.id });
      if (checkId) {
        await Banner.updateOne(
          { _id: req.params.id },
          { title: title, description: description, image }
        );
        res.status(200).json({
          message: "đã cập nhật banner thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại banner bạn muốn cập nhật",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
  //[delete]/api/banner/delete/:id
  deleteBanner: async (req, res) => {
    let bannerID = req.params.id;
    try {
      let checkId = await Banner.findById(bannerID);
      if (checkId) {
        await Banner.deleteOne({ _id: bannerID });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm banner cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ, không tìm banner cần xóa",
      });
    }
  },
};
module.exports = bannerController;
