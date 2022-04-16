const ResultOfExam = require("../models/ResultOfExam");

const resultOfExamController = {
  //[get]/api/result-of-exam/list
  getResultOfExam: async (req, res) => {
    const listResultOfExam = await ResultOfExam.find({});
    res.status(200).json({
      message: "truy cập thành công",
      listResultOfExam: listResultOfExam,
    });
  },
  //[post]/api/result-of-exam/create
  createResultOfExam: async (req, res) => {
    const { option, statisticalID, exaQuesID } = req.body;

    const checkExist = await ResultOfExam.findOne({
      option: option,
      statisticalID: statisticalID,
      exaQuesID: exaQuesID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "kết quả này đã tồn tại",
      });
    } else {
      const newResultOfExam = new ResultOfExam({
        option: option,
        statisticalID: statisticalID,
        exaQuesID: exaQuesID,
      });
      newResultOfExam.save();
      res.status(200).json({
        message: "tạo mới kết quả thành công",
        newResultOfExam: newResultOfExam,
      });
    }
  },
  //[update]/api/result-of-exam/update/:id
  updateResultOfExam: async (req, res) => {
    const { option, statisticalID, exaQuesID } = req.body;

    const checkExist = await ResultOfExam.findOne({
      option: option,
      statisticalID: statisticalID,
      exaQuesID: exaQuesID,
    });
    if (checkExist) {
      res.status(400).json({
        message: "kết quả này đã tồn tại",
      });
    } else {
      try {
        const checkId = await ResultOfExam.findOne({
          _id: req.params.id,
        });
        if (checkId) {
          await ResultOfExam.updateOne(
            {
              _id: req.params.id,
            },
            {
              option: option,
              statisticalID: statisticalID,
              exaQuesID: exaQuesID,
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
  //[delete]/api/result-of-exam/delete/:id
  deleteResultOfExam: async (req, res) => {
    try {
      const checkExist = await ResultOfExam.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await ResultOfExam.deleteOne({
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
module.exports = resultOfExamController;
