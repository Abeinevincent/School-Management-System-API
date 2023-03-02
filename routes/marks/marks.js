const express = require("express");
const router = express.Router();
const { Marks } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A Marks
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateMarksId = () => {
    let dt = new Date().getTime();
    let subjectID = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return subjectID;
  };

  // Capture user details
  const newMarks = {
    subjectName: req.body.subjectName,
    examName: req.body.examName,
    className: req.body.className,
    marks: req.body.marks,
    studentName: req.body.studentName,
    subjectTeacher: req.body.subjectTeacher,
    marksId: generateMarksId(),
  };

  try {
    //  Create Marks , save him in the db and send response
    const marks = await Marks.create(newMarks);
    return res
      .status(201)
      .json({ message: "Marks  created successfully", marks });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Marks   ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Marks.update(req.body, {
      where: { marksId: req.params.id },
    });
    res.status(200).json({ message: "Marks  updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Marks  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const marks = await Marks.findAll();
    res.status(200).json(marks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Marks  BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const marks = await Marks.findOne({
      where: { marksId: req.params.id },
    });
    res.status(200).json(marks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Marks.destroy({
      where: {
        marksId: req.params.id,
      },
    });
    res.status(200).json("Marks  has been deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
