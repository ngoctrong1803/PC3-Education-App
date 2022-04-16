const Topic = require("../models/Topic");
const topicController = {
  //[get]/api/topic/list
  getTopic: async (req, res) => {
    const listTopic = await Topic.find({});
    res.status(200).json({
      message: "lấy chủ đề thành công",
      listTopic: listTopic,
    });
  },
  //[post]/api/Topic/create
  createTopic: async (req, res) => {
    const { topicName, description, image } = req.body;
    const checkTopic = await Topic.findOne({
      topicName: topicName,
      description: description,
      image: image,
    });
    if (checkTopic) {
      res.status(400).json({
        message: "chủ đề này đã tồn tại",
      });
    } else {
      const newTopic = new Topic({
        topicName: topicName,
        description: description,
        image: image,
      });
      newTopic.save();
      res.status(200).json({
        message: "thêm chủ đề thành công",
      });
    }
  },
  //[put]/api/Topic/update/:id
  updateTopic: async (req, res) => {
    const { topicName, description, image } = req.body;
    const checkTopic = await Topic.findOne({
      topicName: topicName,
      description: description,
      image: image,
    });
    if (checkTopic) {
      res.status(400).json({
        message: "chủ đề này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Topic.findOne({ _id: req.params.id });
        if (checkId) {
          await Topic.updateOne(
            { _id: req.params.id },
            { topicName: topicName, description: description, image: image }
          );
          res.status(200).json({
            message: "đã cập nhật chủ đề thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại chủ đề bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/Topic/delete/:id
  deleteTopic: async (req, res) => {
    let TopicId = req.params.id;
    try {
      let checkId = await Topic.findById(TopicId);
      if (checkId) {
        await Topic.deleteOne({ _id: TopicId });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm chủ đề cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm chủ đề cần xóa",
      });
    }
  },
};
module.exports = topicController;
