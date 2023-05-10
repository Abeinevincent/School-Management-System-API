const express = require("express");
const router = express.Router();
const { Students } = require("../../models");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndTeacher,
  verifyTokenAndStudent,
} = require("../../helpers/jsonwebtoken");

// CREATE A STUDENT
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateUserId = () => {
    let dt = new Date().getTime();
    let userID = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return userID;
  };

  // Capture user details
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    address: req.body.address,
    clas: req.body.clas,
    nin: req.body.nin,
    parentEmail: req.body.parentEmail,
    status: req.body.status,
    stream: req.body.stream,
    parentname: req.body.parentname,
    parentcontact: req.body.parentcontact,
    maritalstatus: req.body.maritalstatus,
    role: req.body.role,
    profileimage: req.body.profileimage,
    contact: req.body.contact,
    dateofbirth: req.body.dateofbirth,
    password: req.body.password,
    studentId: generateUserId(),
  };

  const student = await Students.findOne({
    where: { username: req.body.username },
  });
  if (student) {
    return res
      .status(500)
      .json(
        `User with email: (${req.body.username}) already exists, try again.`
      );
  } else {
    try {
      //   Create student, save him in the db and send response
      const student = await Students.create(newUser);
      return res
        .status(201)
        .json({ message: "student created successfully", student });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

// UPDATE student  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Students.update(req.body, { where: { studentId: req.params.id } });
    return res.status(200).json({ message: "student updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Students  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await Students.findAll();
    return res.status(200).json(students);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET student BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await Students.findOne({
      where: { studentId: req.params.id },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET student BY ID  **************************
router.get("/find/:classname", verifyTokenAndTeacher, async (req, res) => {
  try {
    const user = await Students.findAll({
      where: { clas: req.params.classname },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET student BY Passcode  **************************
router.get(
  "/find/getbypasscode/:passcode",
  verifyTokenAndTeacher,
  async (req, res) => {
    try {
      const student = await Students.findOne({
        where: { password: req.params.passcode },
      });
      return res.status(200).json(student);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Students.destroy({
      where: {
        studentId: req.params.id,
      },
    });
    return res.status(200).json("student has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
