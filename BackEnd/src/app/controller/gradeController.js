const Grade = require("../models/Grade");
const gradeController = {
  //[get]/api/grade/list
  getGrade: async (req, res) => {
    const listGrade = await Grade.find({});
    res.status(200).json({
      message: "lấy khối thành công",
      listGrade: listGrade,
    });
  },
};
module.exports = gradeController;
