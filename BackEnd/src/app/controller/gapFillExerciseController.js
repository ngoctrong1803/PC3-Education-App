const GapFillingExercise = require("../models/GapFillingExercise");

const gapFillExerciseController = {
  //[get]/api/gap-fill-exercise/list
  getGapFillingExercise: async (req, res) => {
    const listGapFillingExercise = await GapFillingExercise.find({});
    res.status(200).json({
      message: "đã lấy thành công",
      listGapFillingExercise: listGapFillingExercise,
    });
  },
  //[post]/api/gap-fill-exercise/create
  createGapFillingExercise: async (req, res) => {
    const { content, totalGap, answer, lessionID, catExeID } = req.body;
    if (
      content == null ||
      totalGap == null ||
      answer == null ||
      lessionID == null ||
      catExeID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo 1 câu hỏi chưa đầy đủ",
      });
    } else {
      const checkExist = await GapFillingExercise.findOne({
        content: content,
        totalGap: totalGap,
        answer: answer,
        lessionID: lessionID,
        catExeID: catExeID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        const newGapFillingExercise = new GapFillingExercise({
          content: content,
          totalGap: totalGap,
          answer: answer,
          lessionID: lessionID,
          catExeID: catExeID,
        });
        newGapFillingExercise.save();
        res.status(200).json({
          message: "thêm mới câu hỏi thành công",
        });
      }
    }
  },
  //[put]/api/gap-fill-exercise/update/:id
  updateGapFillingExercise: async (req, res) => {
    const { content, totalGap, answer, lessionID, catExeID } = req.body;
    if (
      content == null ||
      totalGap == null ||
      answer == null ||
      lessionID == null ||
      catExeID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo 1 câu hỏi chưa đầy đủ",
      });
    } else {
      const checkExist = await GapFillingExercise.findOne({
        content: content,
        totalGap: totalGap,
        answer: answer,
        lessionID: lessionID,
        catExeID: catExeID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        try {
          const checkId = await GapFillingExercise.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await GapFillingExercise.updateOne(
              { _id: req.params.id },
              {
                content: content,
                totalGap: totalGap,
                answer: answer,
                lessionID: lessionID,
                catExeID: catExeID,
              }
            );
            res.status(200).json({
              message: "cập nhật thành công",
            });
          } else {
            res.status(400).json({
              message: "không tồn tại câu hỏi cần cập nhật",
            });
          }
        } catch (err) {
          res.status(400).json({
            message: "Id không hợp lệ",
          });
        }
      }
    }
  },
  //[delete]/api/gap-fill-exercise/delete/:id
  deleteGapFillingExercise: async (req, res) => {
    try {
      const checkExist = await GapFillingExercise.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await GapFillingExercise.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa câu hỏi thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại câu hỏi cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = gapFillExerciseController;
