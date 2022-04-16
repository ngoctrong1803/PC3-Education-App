const Rank = require("../models/Rank");
const rankController = {
  //[get]/api/rank/list
  getRank: async (req, res) => {
    const listRank = await Rank.find({});
    res.status(200).json({
      message: "lấy rank thành công",
      listRank: listRank,
    });
  },
  //[post]/api/rank/create
  createRank: async (req, res) => {
    const { score, victory, userID } = req.body;
    const checkRank = await Rank.findOne({
      score: score,
      victory: victory,
      userID: userID,
    });
    if (checkRank) {
      res.status(400).json({
        message: "rank này đã tồn tại",
      });
    } else {
      const newRank = new Rank({
        score: score,
        victory: victory,
        userID: userID,
      });
      newRank.save();
      res.status(200).json({
        message: "thêm rank thành công",
      });
    }
  },
  //[put]/api/rank/update/:id
  updateRank: async (req, res) => {
    const { score, victory, userID } = req.body;
    const checkRank = await Rank.findOne({
      score: score,
      victory: victory,
      userID: userID,
    });
    if (checkRank) {
      res.status(400).json({
        message: "rank này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Rank.findOne({ _id: req.params.id });
        if (checkId) {
          await Rank.updateOne(
            { _id: req.params.id },
            { score: score, victory: victory, userID: userID }
          );
          res.status(200).json({
            message: "đã cập nhật rank thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại rank bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/rank/delete/:id
  deleteRank: async (req, res) => {
    let RankId = req.params.id;
    try {
      let checkId = await Rank.findById(RankId);
      if (checkId) {
        await Rank.deleteOne({ _id: RankId });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm rank cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm rank cần xóa",
      });
    }
  },
};
module.exports = rankController;
