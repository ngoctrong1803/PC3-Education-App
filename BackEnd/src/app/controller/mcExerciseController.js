const MCExercise = require("../models/MCExercise");
const mcExerciseController = {
  //[get]/api/mcexercise/list-mcexercise
  getMCExercise: async (req, res) => {
    const listMCExercise = await MCExercise.find({});
    res.status(200).json({
      message: "thành công truy cập get list exercise",
      listMCExercise: listMCExercise,
    });
  },
  //[post]/api/mcexercise/list-mcexercise
  createMCExercise: async (req, res) => {
    res.status(200).json({
      message: "thành công truy cập create exercise",
    });
  },
  //[put]/api/mcexercise/list-mcexercise
  updateMCExercise: async (req, res) => {
    res.status(200).json({
      message: "thành công truy cập update exercise",
    });
  },
  //[delete]/api/mcexercise/list-mcexercise
  deleteMCExercise: async (req, res) => {
    res.status(200).json({
      message: "thành công truy cập delete exercise",
    });
  },
};
module.exports = mcExerciseController;
