const Topic = require("../models/Topic");
const topicController = {
  //[get]/api/topic/list
  getTopic: async (req, res) => {
    const listTopic = await Topic.find({}).sort({
      createAt: -1,
    });
    res.status(200).json({
      message: "lấy danh sách chủ đề thành công",
      listTopic: listTopic,
    });
  },

  //[get]/api/topic/list
  getTopicPagination: async (req, res) => {
    let topicInPage = 3;
    let currentPage = req.params.page;
    let topicName = req.body.topicName;
    const listTotalTopic = await Topic.find({
      topicName: { $regex: topicName },
    });
    const listTopic = await Topic.find({
      topicName: { $regex: topicName },
    })
      // .sort({
      //   createAt: -1,
      // })
      .skip(currentPage * topicInPage - topicInPage)
      .limit(topicInPage)
      .sort({
        createdAt: -1,
      });
    let totalTopic = listTotalTopic.length;
    res.status(200).json({
      message: "lấy danh sách chủ đề thành công",
      listTopic: listTopic,
      totalPage: Math.ceil(totalTopic / topicInPage),
      currentPage: currentPage,
    });
  },
  //[get]/api/topic/list
  getTopicPaginationIndex: async (req, res) => {
    let topicInPage = 10;
    let currentPage = req.params.page;
    let topicName = req.body.topicName;
    const listTotalTopic = await Topic.find({
      topicName: { $regex: topicName },
    });
    const listTopic = await Topic.find({
      topicName: { $regex: topicName },
    })
      // .sort({
      //   createAt: -1,
      // })
      .skip(currentPage * topicInPage - topicInPage)
      .limit(topicInPage)
      .sort({
        createdAt: -1,
      });
    let totalTopic = listTotalTopic.length;
    res.status(200).json({
      message: "lấy danh sách chủ đề thành công",
      listTopic: listTopic,
      totalPage: Math.ceil(totalTopic / topicInPage),
      currentPage: currentPage,
    });
  },
  //[post]/api/topic/create
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
