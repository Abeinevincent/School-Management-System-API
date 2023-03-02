const express = require("express");
const router = express.Router();
const { Exams } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A Exam
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateExamId = () => {
    let dt = new Date().getTime();
    let examId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return examId;
  };

  // Capture user details
  const newExam = {
    examDate: req.body.examDate,
    examTimetable: req.body.examTimetable,
    runningTerm: req.body.runningTerm,
    examName: req.body.examName,
    examId: generateExamId(),
  };

  try {
    //  Create Exam, save him in the db and send response
    const exams = await Exams.create(newExam);
    return res
      .status(201)
      .json({ Message: "Exam created successfully", exams });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Exam  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Exams.update(req.body, {
      where: { examId: req.params.id },
    });
    return res.status(200).json({ exams: "Exam updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Exams  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const exams = await Exams.findAll();
    return res.status(200).json(exams);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Exam BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const exams = await Exams.findOne({
      where: { examId: req.params.id },
    });
    return res.status(200).json(exams);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Exams.destroy({
      where: {
        examId: req.params.id,
      },
    });
    return res.status(200).json("Exam has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
