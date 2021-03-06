const Unit = require("../models/Unit");
const Subject = require("../models/Subject");
const Lession = require("../models/Lession");
const Theory = require("../models/Theory");
const MCExercise = require("../models/MCExercise");
const ListenExercise = require("../models/ListenExercise");
const RewriteSentencesExercise = require("../models/RewriteSentencesExercise");
const GapFillingExercise = require("../models/GapFillingExercise");
const StatisticalOfExercise = require("../models/StatisticalOfExercise");
const ResultOfExercise = require("../models/ResultOfExercise");

const unitController = {
  //[get]/api/unit/list-unit
  getUnit: async (req, res) => {
    const listUnit = await Unit.find({});
    res.status(200).json({
      message: "lấy unit thành công",
      listUnit: listUnit,
    });
  },
  //[post]/api/unit/create
  createUnit: async (req, res) => {
    const { unitName, slug } = req.body;
    const subejctOfUnit = await Subject.findOne({ slug: slug });
    const subjectID = subejctOfUnit._id;
    const checkUnit = await Unit.findOne({
      unitName: unitName,
      subjectID: subjectID,
    });
    if (checkUnit) {
      res.status(400).json({
        message: "chương này đã tồn tại",
      });
    } else {
      let newUnit = new Unit({
        unitName: unitName,
        subjectID: subjectID,
      });
      newUnit.save();
      res.status(200).json({
        message: "đã tạo Unit thành công",
        unit: newUnit,
      });
    }
  },
  //[put]/api/unit/update/:id
  updateUnit: async (req, res) => {
    const { unitName } = req.body;
    const checkUnit = await Unit.findOne({
      unitName: unitName,
    });
    if (checkUnit) {
      res.status(400).json({
        message: "chương này đã tồn tại",
      });
    } else {
      try {
        const checkId = await Unit.findOne({ _id: req.params.id });
        if (checkId) {
          await Unit.updateOne(
            { _id: req.params.id },
            {
              unitName: unitName,
            }
          );

          res.status(200).json({
            message: "đã cập nhật Unit thành công",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại unit muốn update",
        });
      }
    }
  },
  //[delete]/api/unit/delete/:id
  deleteUnit: async (req, res) => {
    try {
      console.log("id để xóa", req.params.id);
      const checkId = await Unit.findOne({ _id: req.params.id });
      if (checkId) {
        console.log("---------------- xóa unit ----------------");

        const lessions = await Lession.find({ unitID: req.params.id });
        console.log("lessions:", lessions);
        const lessionIdArray = lessions.map(({ _id }) => _id);
        console.log("lessionArray:", lessionIdArray);
        const theory = await Theory.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("theory:", theory);
        const mcExercise = await MCExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("mcExercise:", mcExercise);
        const listenExercise = await ListenExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("listenExercise:", listenExercise);
        const rewriteSentencesExercise = await RewriteSentencesExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("rewriteSentencesExercise:", rewriteSentencesExercise);
        const gapFillingExercise = await GapFillingExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("gapFillingExercise:", gapFillingExercise);

        const statisticalOfExercise = await StatisticalOfExercise.find({
          lessionID: { $in: lessionIdArray },
        });
        console.log("statisticalOfExercise:", statisticalOfExercise);
        const statisticalOfExerciseIDArray = statisticalOfExercise.map(
          ({ _id }) => _id
        );
        console.log(
          "statisticalOfExerciseIDArray:",
          statisticalOfExerciseIDArray
        );
        const resultOfExercise = await ResultOfExercise.find({
          statisticalID: { $in: statisticalOfExerciseIDArray },
        });
        console.log("resultOfExercise:", resultOfExercise);

        //delete mcExercise
        await MCExercise.deleteMany({
          lessionID: { $in: lessionIdArray },
        });
        await ResultOfExercise.deleteMany({
          statisticalID: { $in: statisticalOfExerciseIDArray },
        });
        await StatisticalOfExercise.deleteMany({
          lessionID: { $in: lessionIdArray },
        });
        await Theory.deleteMany({
          lessionID: { $in: lessionIdArray },
        });
        await Lession.deleteMany({
          unitID: { $in: req.params.id },
        });
        await Unit.deleteMany({
          _id: req.params.id,
        });

        Unit.deleteOne({ _id: req.params.id });
        res.status(200).json({
          message: "đã xóa unit thành công",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tồn tại unit cần xóa",
      });
    }
  },
};
module.exports = unitController;
