const express = require("express");
const router = express.Router();
const { Teachers } = require("../../models");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A TEACHER
router.post("/", verifyTokenAndAdmin, async (req, res) => {
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
    class: req.body.class,
    stream: req.body.stream,
    educationlevel: req.body.educationlevel,
    maritalstatus: req.body.maritalstatus,
    role: req.body.role,
    profileimage: req.body.profileimage,
    contact: req.body.contact,
    dateofbirth: req.body.dateofbirth,
    subject: req.body.subject,
    // Hash/encrypt the password using CryptoJS and cypher algorithm
    password: req.body.password,
    teacherId: generateUserId(),
  };

  const teacher = await Teachers.findOne({
    where: { username: req.body.username },
  });
  if (teacher) {
    return res
      .status(500)
      .json(
        `User with email: (${req.body.username}) already exists, try again.`
      );
  } else {
    try {
      //   Create teacher, save him in the db and send response
      const teacher = await Teachers.create(newUser);
      return res
        .status(201)
        .json({ message: "Teacher created successfully", teacher });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// UPDATE TEACHER  ***********************
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Teachers.update(req.body, { where: { teacherId: req.params.id } });
    return res.status(200).json({ message: "Teacher updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET TEACHERS  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const teachers = await Teachers.findAll();
    return res.status(200).json(teachers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET TEACHER BY ID  **************************
router.get("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    const user = await Teachers.findOne({
      where: { teacherId: req.params.id },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET TEACHER BY NAME  **************************
router.get("/find/:name", verifyTokenAndTeacher, async (req, res) => {
  try {
    const user = await Teachers.findOne({
      where: { firstname: req.params.name },
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Teachers.destroy({
      where: {
        teacherId: req.params.id,
      },
    });
    return res.status(200).json("Teacher has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
