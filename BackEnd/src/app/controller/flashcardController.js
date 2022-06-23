const Flashcard = require("../models/Flashcard");
const Topic = require("../models/Topic");
const User = require("../models/User");
const flashcardController = {
  //[get]/api/flashcard/list
  getFlashcard: async (req, res) => {
    const listFlashcard = await Flashcard.find({});
    res.status(200).json({
      message: "lấy Flashcard thành công",
      listFlashcard: listFlashcard,
    });
  },
  //[get]/api/flashcard/list/:id
  getFlashcardByTopicID: async (req, res) => {
    const topicID = req.params.id;
    const listFlashcard = await Flashcard.find({
      topicID: topicID,
    });
    const topic = await Topic.findOne({
      _id: topicID,
    });
    const userIDArray = listFlashcard.map(({ userID }) => userID);
    console.log("userIDArray:", userIDArray);
    const users = await User.find({ _id: { $in: userIDArray } });
    console.log("users:", users);
    console.log("flashcard ở đây:", listFlashcard);
    res.status(200).json({
      message: "lấy Flashcard thành công",
      listFlashcard: listFlashcard,
      topic: topic,
      users,
    });
  },
  //[get]/api/flashcard/list/:id
  getFlashcardByTopicIDPagination: async (req, res) => {
    const topicID = req.params.id;
    const flashcardInPage = 6;
    const currentPage = req.body.page;
    const nameToFind = req.body.nameToFind;
    const listTotalFlashcard = await Flashcard.find({
      topicID: topicID,
      $or: [
        { meaningInEnglish: { $regex: nameToFind } },
        { meaningInVietnamese: { $regex: nameToFind } },
      ],
    });

    const listFlashcard = await Flashcard.find({
      topicID: topicID,
      $or: [
        { meaningInEnglish: { $regex: nameToFind } },
        { meaningInVietnamese: { $regex: nameToFind } },
      ],
    })

      .skip(currentPage * flashcardInPage - flashcardInPage)
      .limit(flashcardInPage)
      .sort({
        createdAt: -1,
      });
    let totalFlashcard = listTotalFlashcard.length;
    const topic = await Topic.findOne({
      _id: topicID,
    });
    const userIDArray = listFlashcard.map(({ userID }) => userID);

    const users = await User.find({ _id: { $in: userIDArray } });

    res.status(200).json({
      message: "lấy Flashcard thành công",
      listFlashcard: listFlashcard,
      topic: topic,
      users,
      totalPage: Math.ceil(totalFlashcard / flashcardInPage),
      currentPage: currentPage,
    });
  },
  //[post]/api/flashcard/create
  createFlashcard: async (req, res) => {
    const {
      meaningInEnglish,
      meaningInVietnamese,
      star,
      forgetfulness,
      explain,
      example,
      shared,
      topicID,
      userID,
    } = req.body;
    const checkFlashcard = await Flashcard.findOne({
      meaningInEnglish: meaningInEnglish,
      meaningInVietnamese: meaningInVietnamese,
      star: star,
      forgetfulness: forgetfulness,
      explain: explain,
      example: example,
      shared: shared,
      topicID: topicID,
      userID: userID,
    });
    if (checkFlashcard) {
      res.status(400).json({
        message: "Flashcard này đã tồn tại",
      });
    } else {
      const newFlashcard = new Flashcard({
        meaningInEnglish: meaningInEnglish,
        meaningInVietnamese: meaningInVietnamese,
        star: star,
        forgetfulness: forgetfulness,
        explain: explain,
        example: example,
        shared: shared,
        topicID: topicID,
        userID: userID,
      });
      newFlashcard.save();
      res.status(200).json({
        message: "thêm Flashcard thành công",
      });
    }
  },
  //[put]/api/Flashcard/update/:id
  updateFlashcard: async (req, res) => {
    const { meaningInEnglish, meaningInVietnamese, explain, example, userID } =
      req.body;
    const checkFlashcard = await Flashcard.findOne({
      meaningInEnglish: meaningInEnglish,
      meaningInVietnamese: meaningInVietnamese,
      explain: explain,
      example: example,
      userID: userID,
    });
    if (checkFlashcard) {
      res.status(400).json({
        message: "Flashcard này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Flashcard.findOne({ _id: req.params.id });
        if (checkId) {
          await Flashcard.updateOne(
            { _id: req.params.id },
            {
              meaningInEnglish: meaningInEnglish,
              meaningInVietnamese: meaningInVietnamese,
              explain: explain,
              example: example,
            }
          );
          res.status(200).json({
            message: "đã cập nhật Flashcard thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại Flashcard bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/Flashcard/delete/:id
  deleteFlashcard: async (req, res) => {
    let FlashcardId = req.params.id;
    try {
      let checkId = await Flashcard.findById(FlashcardId);
      if (checkId) {
        await Flashcard.deleteOne({ _id: FlashcardId });
        res.status(200).json({
          message: "đã xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm Flashcard cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm Flashcard cần xóa",
      });
    }
  },
};
module.exports = flashcardController;
