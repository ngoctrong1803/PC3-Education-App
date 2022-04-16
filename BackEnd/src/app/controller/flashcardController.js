const Flashcard = require("../models/Flashcard");
const flashcardController = {
  //[get]/api/flashcard/list
  getFlashcard: async (req, res) => {
    const listFlashcard = await Flashcard.find({});
    res.status(200).json({
      message: "lấy Flashcard thành công",
      listFlashcard: listFlashcard,
    });
  },
  //[post]/api/flashcard/create
  createFlashcard: async (req, res) => {
    const {
      meaningInEnglish,
      meaninfInVietnamese,
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
      meaninfInVietnamese: meaninfInVietnamese,
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
        meaninfInVietnamese: meaninfInVietnamese,
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
    const {
      meaningInEnglish,
      meaninfInVietnamese,
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
      meaninfInVietnamese: meaninfInVietnamese,
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
      try {
        const checkId = await Flashcard.findOne({ _id: req.params.id });
        if (checkId) {
          await Flashcard.updateOne(
            { _id: req.params.id },
            {
              meaningInEnglish: meaningInEnglish,
              meaninfInVietnamese: meaninfInVietnamese,
              star: star,
              forgetfulness: forgetfulness,
              explain: explain,
              example: example,
              shared: shared,
              topicID: topicID,
              userID: userID,
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
