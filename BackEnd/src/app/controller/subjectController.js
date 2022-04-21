const Subject = require("../models/Subject");
const Grade = require("../models/Grade");
const Unit = require("../models/Unit");
const Lession = require("../models/Lession");
const slugify = require("slugify");

const subjectController = {
  //[get]/api/subject/:slug (here is subject detail)

  //[get]/api/subejct/get-list-subject
  getListSubject: async (req, res) => {
    let subjectInPage = 3;
    const listSubject = await Subject.find({}).sort({
      gradeID: -1,
    });

    let totalSubject = await Subject.countDocuments();
    res.status(200).json({
      message: "lấy danh sách môn học thành công",
      listSubject: listSubject,
      totalPage: Math.ceil(totalSubject / subjectInPage),
      currentPage: 1,
    });
  },
  //[get]/api/subejct/get-list-subject/:page
  getListSubjectPagination: async (req, res) => {
    let subjectInPage = 3;
    let currentPage = req.params.page;
    console.log("page đã lấy được là:", currentPage);
    const listSubject = await Subject.find({})
      .sort({
        gradeID: -1,
      })
      .skip(currentPage * subjectInPage - subjectInPage)
      .limit(subjectInPage);
    let totalSubject = await Subject.countDocuments();
    res.status(200).json({
      message: "lấy danh sách môn học thành công",
      listSubject: listSubject,
      totalPage: Math.ceil(totalSubject / subjectInPage),
      currentPage: currentPage,
    });
  },
  //[get]/api/subjects/content
  getContentOfSubject: async (req, res) => {
    const slug = req.params.slug;
    const subject = await Subject.findOne({ slug: slug });
    const subejctID = subject._id;
    const units = await Unit.find({ subjectID: subejctID });
    const unitIdArray = units.map(({ _id }) => _id); // chức các id của unit
    const lessions = await Lession.find({
      unitID: { $in: unitIdArray },
    }).sort({ lessionNumber: 1 });
    res.status(201).json({
      message: "lấy nội dung môn học thành công",
      subject: subject,
      units: units,
      lessions: lessions,
    });
    // const lessionIdArray = lessions.map(({ _id }) => _id);
  },
  //[post]/api/subject/create
  createSucject: async (req, res) => {
    console.log("data when create subject:", req.body);
    const checkSubject = await Subject.findOne({
      name: req.body.name,
      gradeID: req.body.gradeID,
    });
    if (checkSubject) {
      res.status(400).json({
        message: "môn học đã tồn tại",
      });
    } else {
      const newsubject = new Subject({
        name: req.body.name,
        gradeID: req.body.gradeID,
      });
      newsubject.save();
      res
        .status(201)
        .json({ message: "tạo mới thành công", subject: newsubject });
    }
  },
  //[put]/api/subject/update/:id
  updateSubject: async (req, res) => {
    const subject = await Subject.findOne({
      name: req.body.name,
      gradeID: req.body.gradeID,
    });
    if (subject) {
      res.status(400).json({
        message: "môn học đã tồn tại",
      });
    } else {
      try {
        const subject = await Subject.findOne({ _id: req.params.id });
        if (subject) {
          await Subject.updateOne(
            { _id: req.params.id },
            {
              name: req.body.name,
              gradeID: req.body.gradeID,
              slug: slugify(req.body.name + "-" + req.body.gradeID),
            }
          );
          res.status(200).json({
            message: "cập nhật môn học thành công",
          });
        } else {
          res.status(400).json({
            message: "không tồn tại môn học bạn muốn cập nhật",
          });
        }
      } catch (err) {
        res.status(400).json({
          message: "không tồn tại môn học bạn muốn cập nhật",
        });
      }
    }
  },
  //[delete]/api/subject/delete/:id
  deleteSubject: async (req, res) => {
    try {
      const subject = await Subject.findOne({ _id: req.params.id });
      if (subject) {
        await Subject.deleteOne({ _id: req.params.id });
        res.status(200).json({
          message: "xóa môn học thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm thấy môn học cần xóa",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "không tìm thấy môn học cần xóa",
      });
    }
  },
};
module.exports = subjectController;
