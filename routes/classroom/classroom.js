const express = require("express");
const router = express.Router();
const { Classroom } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A CLASSROOM
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateClassroomId = () => {
    let dt = new Date().getTime();
    let classroomID = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return classroomID;
  };

  // Capture user details
  const newClassroom = {
    classNumeral: req.body.classNumeral,
    className: req.body.className,
    classTeacher: req.body.classTeacher,
    classroomId: generateClassroomId(),
  };

  const classroom = await Classroom.findOne({
    where: { className: req.body.className },
  });
  if (classroom) {
    return res
      .status(500)
      .json(
        `Class with name: (${req.body.className}) already exists, try again.`
      );
  } else {
    try {
      //  Create classroom, save him in the db and send response
      const classroom = await Classroom.create(newClassroom);
      return res
        .status(201)
        .json({ message: "classroom created successfully", classroom });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// UPDATE classroom  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Classroom.update(req.body, {
      where: { classroomId: req.params.id },
    });
    res.status(200).json({ message: "classroom updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET classrooms  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const classrooms = await Classroom.findAll();
    return res.status(200).json(classrooms);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET classroom BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({
      where: { classroomId: req.params.id },
    });
    return res.status(200).json(classroom);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET classroom BY CLASSNAME  **************************
router.get("/find/:classname", verifyToken, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({
      where: { className: req.params.classname },
    });
    return res.status(200).json(classroom);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Classroom.destroy({
      where: {
        classroomId: req.params.id,
      },
    });
    return res.status(200).json("Classroom has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
