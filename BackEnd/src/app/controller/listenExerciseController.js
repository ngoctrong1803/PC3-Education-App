const ListenExercise = require("../models/ListenExercise");

const listenExerciseController = {
  //[get]/api/listen-exercise/list
  getListenExercise: async (req, res) => {
    const listListenExercise = await ListenExercise.find({});
    res.status(200).json({
      message: "truy cập thành công",
      listListenExercise: listListenExercise,
    });
  },
  //[post]/api/listen-exercise/create
  createListenExercise: async (req, res) => {
    const {
      audio,
      question,
      option1,
      option2,
      option3,
      option4,
      content,
      answer,
      lessionID,
      catExeID,
    } = req.body;
    if (
      audio == null ||
      question == null ||
      option1 == null ||
      option2 == null ||
      option3 == null ||
      option4 == null ||
      content == null ||
      answer == null ||
      lessionID == null ||
      catExeID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo 1 câu hỏi chưa đầy đủ",
      });
    } else {
      const checkExist = await ListenExercise.findOne({
        audio: audio,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        content: content,
        answer: answer,
        lessionID: lessionID,
        catExeID: catExeID,
      });
      if (checkExist) {
        res.status(400).json({
          message: "câu hỏi này đã tồn tại",
        });
      } else {
        const newListenExercise = new ListenExercise({
          audio: audio,
          question: question,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          content: content,
          answer: answer,
          lessionID: lessionID,
          catExeID: catExeID,
        });
        newListenExercise.save();
        res.status(200).json({
          message: "thêm mới câu hỏi thành công",
        });
      }
    }
  },
  //[update]/api/listen-exercise/update/:id
  updateListenExercise: async (req, res) => {
    const {
      audio,
      question,
      option1,
      option2,
      option3,
      option4,
      content,
      answer,
      lessionID,
      catExeID,
    } = req.body;
    if (
      audio == null ||
      question == null ||
      option1 == null ||
      option2 == null ||
      option3 == null ||
      option4 == null ||
      content == null ||
      answer == null ||
      lessionID == null ||
      catExeID == null
    ) {
      res.status(200).json({
        message: "thông tin để tạo 1 câu hỏi chưa đầy đủ",
      });
    } else {
      const checkExist = await ListenExercise.findOne({
        audio: audio,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        content: content,
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
          const checkId = await ListenExercise.findOne({
            _id: req.params.id,
          });
          if (checkId) {
            await ListenExercise.updateOne(
              { _id: req.params.id },
              {
                audio: audio,
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                content: content,
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
  //[delete]/api/listen-exercise/delete/:id
  deleteListenExercise: async (req, res) => {
    try {
      const checkExist = await ListenExercise.findOne({
        _id: req.params.id,
      });
      if (checkExist) {
        await ListenExercise.deleteOne({
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
module.exports = listenExerciseController;
