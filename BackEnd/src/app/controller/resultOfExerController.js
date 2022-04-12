const ResultOfExercise = require("../models/ResultOfExercise");

const resultOfExerController = {
  //[get]/api/result-of-exercise/list
  getResultOfExercise: async (req, res) => {
    const listResultOfExercise = await ResultOfExercise.find({});
    res.status(200).json({
      message: "truy cập thành công",
      listResultOfExercise: listResultOfExercise,
    });
  },
  //[post]/api/result-of-exercise/create
  createResultOfExercise: async (req, res) => {
    const { option, statisticalID, MCExerciseID } = req.body;

    const checkExist = await ResultOfExercise.findOne({
      option: option,
      statisticalID: statisticalID,
      MCExerciseID: MCExerciseID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "kết quả này đã tồn tại",
      });
    } else {
      const newResultOfExercise = new ResultOfExercise({
        option: option,
        statisticalID: statisticalID,
        MCExerciseID: MCExerciseID,
      });
      newResultOfExercise.save();
      res.status(200).json({
        message: "tạo mới kết quả thành công",
        newResultOfExercise: newResultOfExercise,
      });
    }
  },
  //[update]/api/result-of-exercise/update/:id
  updateResultOfExercise: async (req, res) => {
    const { option, statisticalID, MCExerciseID } = req.body;

    const checkExist = await ResultOfExercise.findOne({
      option: option,
      statisticalID: statisticalID,
      MCExerciseID: MCExerciseID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "kết quả này đã tồn tại",
      });
    } else {
      try {
        const checkId = await ResultOfExercise.findOne({
          _id: req.params.id,
        });
        if (checkId) {
          await ResultOfExercise.updateOne(
            {
              _id: req.params.id,
            },
            {
              option: option,
              statisticalID: statisticalID,
              MCExerciseID: MCExerciseID,
            }
          );
          res.status(200).json({
            message: "cập nhật kết quả thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại kết quả muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "Id không hợp lệ",
        });
      }
    }
  },
  //[delete]/api/result-of-exercise/delete/:id
  deleteResultOfExercise: async (req, res) => {
    try {
      const checkExist = await ResultOfExercise.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await ResultOfExercise.deleteOne({
          _id: req.params.id,
        });
        res.status(200).json({
          message: "xóa thành công",
        });
      } else {
        res.status(400).json({
          message: "không tồn tại kết quả cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Id không hợp lệ",
      });
    }
  },
};
module.exports = resultOfExerController;
