const CategoryExercise = require("../models/CategoryExercise");
const MCExercise = require("../models/MCExercise");
const Lession = require("../models/Lession");
const mcExerciseController = {
  //[get]/api/mcexercise/list-mcexercise
  getMCExercise: async (req, res) => {
    const listMCExercise = await MCExercise.find({});
    res.status(200).json({
      message: "thành công truy cập get list exercise",
      listMCExercise: listMCExercise,
    });
  },
  //[get]/api/mcexercise/list/:lessionid
  getMCExerciseOfLession: async (req, res) => {
    const lessionID = req.params.id;
    const lession = await Lession.findOne({ _id: lessionID });
    const listMCExercise = await MCExercise.find({
      lessionID: lessionID,
    });
    const mcExerciseIdArray = listMCExercise.map(({ catExeID }) => catExeID);
    const categoryOfExercise = await CategoryExercise.find({
      _id: { $in: mcExerciseIdArray },
    });
    res.status(200).json({
      message: "thành công truy cập get list exercise",
      listMCExercise,
      categoryOfExercise,
      lession,
    });
  },
  //[get]/api/mcexercise/list/:lessionid
  getMCExerciseOfLessionPagination: async (req, res) => {
    const lessionID = req.params.id;

    const cateToFind = req.body.cateToFind;
    const contentToFind = req.body.contentToFind;
    const currentPage = req.body.page;

    let mcExerciseInPage = 5;

    if (cateToFind == "") {
      const listTotalMCExercise = await MCExercise.find({
        lessionID: lessionID,
        question: { $regex: contentToFind },
      });

      const listMCExercise = await MCExercise.find({
        lessionID: lessionID,
        question: { $regex: contentToFind },
      })
        .skip(currentPage * mcExerciseInPage - mcExerciseInPage)
        .limit(mcExerciseInPage);
      let totalPage = listTotalMCExercise.length;

      const lession = await Lession.findOne({ _id: lessionID });
      const categoryOfExercise = await CategoryExercise.find();
      res.status(200).json({
        message: "thành công truy cập get list exercise",
        listMCExercise,
        categoryOfExercise,
        lession,
        totalPage: Math.ceil(totalPage / mcExerciseInPage),
      });
    } else if (cateToFind != "") {
      const listTotalMCExercise = await MCExercise.find({
        lessionID: lessionID,
        catExeID: cateToFind,
        question: { $regex: contentToFind },
      });

      const listMCExercise = await MCExercise.find({
        lessionID: lessionID,
        catExeID: cateToFind,
        question: { $regex: contentToFind },
      })
        .skip(currentPage * mcExerciseInPage - mcExerciseInPage)
        .limit(mcExerciseInPage);
      let totalPage = listTotalMCExercise.length;

      const lession = await Lession.findOne({ _id: lessionID });
      const categoryOfExercise = await CategoryExercise.find();
      res.status(200).json({
        message: "thành công truy cập get list exercise",
        listMCExercise,
        categoryOfExercise,
        lession,
        totalPage: Math.ceil(totalPage / mcExerciseInPage),
      });
    }
  },
  //[get]/api/mcexercise/detail/:id
  getMCExerciseByID: async (req, res) => {
    const mcExerciseID = req.params.id;
    const mcExercise = await MCExercise.findOne({
      _id: mcExerciseID,
    });
    if (mcExercise) {
      res.status(200).json({
        message: "thành công truy cập getb exercise",
        mcExercise,
      });
    } else {
      res.status(400).json({
        message: "không tìm thấy bài tập",
      });
    }
  },
  //[post]/api/mcexercise/list-mcexercise
  createMCExercise: async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      explain,
      recommend,
      lessionID,
      catExeID,
    } = req.body;
    const checkMCExercise = await MCExercise.findOne({
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
      explain: explain,
      recommend: recommend,
      lessionID: lessionID,
      catExeID: catExeID,
    });
    if (checkMCExercise) {
      res.status(400).json({
        message: "đã tồn tại câu hỏi này",
      });
    } else {
      const newMCExercise = new MCExercise({
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
        explain: explain,
        recommend: recommend,
        lessionID: lessionID,
        catExeID: catExeID,
      });
      newMCExercise.save();
      res.status(200).json({
        message: "tạo mới câu hỏi thành công",
      });
    }
  },
  //[put]/api/mcexercise/list-mcexercise
  updateMCExercise: async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      explain,
      recommend,
      lessionID,
      catExeID,
    } = req.body;
    const checkMCExercise = await MCExercise.findOne({
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
      explain: explain,
      recommend: recommend,
      lessionID: lessionID,
      catExeID: catExeID,
    });
    if (checkMCExercise) {
      res.status(400).json({
        message: "đã tồn tại câu hỏi này",
      });
    } else {
      let mcExerciseID = req.params.id;
      try {
        const checkUpdate = await MCExercise.findOne({
          _id: mcExerciseID,
        });
        if (checkUpdate) {
          await MCExercise.updateOne(
            { _id: mcExerciseID },
            {
              question: question,
              option1: option1,
              option2: option2,
              option3: option3,
              option4: option4,
              answer: answer,
              explain: explain,
              recommend: recommend,
              lessionID: lessionID,
              catExeID: catExeID,
            }
          );
          res.status(200).json({
            message: "đã cập nhật câu hỏi thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại câu hỏi bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "id không đúng định dạng",
        });
      }
    }
  },
  //[delete]/api/mcexercise/list-mcexercise
  deleteMCExercise: async (req, res) => {
    let mcExerciseID = req.params.id;
    console.log("exercise:", mcExerciseID);
    try {
      const checkDelete = await MCExercise.findOne({
        _id: mcExerciseID,
      });
      console.log("check exercise:", checkDelete);
      if (checkDelete) {
        await MCExercise.deleteOne({
          _id: mcExerciseID,
        });
        res.status(200).json({
          message: "xóa câu hỏi thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm thấu câu hỏi cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "id không đúng định dạng",
      });
    }
  },
};
module.exports = mcExerciseController;
