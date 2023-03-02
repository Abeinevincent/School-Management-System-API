const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { Teachers } = require("../models");
const { Students } = require("../models");
const { NonTeachingStaff } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jsonwebtoken");

// REGISTER ***********************
router.post("/register", async (req, res) => {
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Capture user details
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    // Hash/encrypt the password using CryptoJS and cypher algorithm
    password: hashedPassword,
    userId: generateUserId(),
  };

  const user = await Users.findOne({ where: { username: req.body.username } });

  if (user) {
    return res
      .status(500)
      .json(
        `User with username: (${req.body.username}) already exists, try again.`
      );
  } else {
    try {
      //   Create user, save him in the db and send response
      const user = await Users.create(newUser);
      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

// LOGIN ADMIN USER **************************
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      return res
        .status(404)
        .json(
          "User with the provided username doesnot exist, please create an account!"
        );
    }

    // Compare passwords/passwords and if its incorrect, tell the user to try again
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Incorrect pasword, please try again!");
    }

    // Token payload
    const tokenPayload = {
      id: user.userId,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    return res.status(200).json({
      message: "User login successful",
      user,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// LOGIN TEACHER **************************
router.post("/loginTeacher", async (req, res) => {
  try {
    const teacher = await Teachers.findOne({
      where: { username: req.body.username },
    });

    if (!teacher) {
      return res
        .status(404)
        .json(
          "User with the provided username doesnot exist, please create an account!"
        );
    }

    // Token payload
    const tokenPayload = {
      id: teacher.teacherId,
      username: teacher.username,
      isTeacher: teacher.isTeacher,
    };

    return res.status(200).json({
      message: "User login successful",
      teacher,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// LOGIN STUDENT **************************
router.post("/loginStudent", async (req, res) => {
  try {
    const student = await Students.findOne({
      where: { username: req.body.username },
    });

    if (!student) {
      return res
        .status(404)
        .json(
          "User with the provided username doesnot exist, please create an account!"
        );
    }

    // Token payload
    const tokenPayload = {
      id: student.studentId,
      username: student.username,
      isTeacher: student.isStudent,
    };

    return res.status(200).json({
      message: "User login successful",
      student,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// LOGIN NONTEACHINGSTAFF **************************
router.post("/loginNonteachingstaff", async (req, res) => {
  try {
    const nonteachingstaff = await NonTeachingStaff.findOne({
      where: { username: req.body.username },
    });

    if (!nonteachingstaff) {
      return res
        .status(404)
        .json(
          "User with the provided username doesnot exist, please create an account!"
        );
    }

    // Token payload
    const tokenPayload = {
      id: nonteachingstaff.nonteachingstaffId,
      username: nonteachingstaff.username,
      isNonteachingstaff: nonteachingstaff.isNonteachingstaff,
    };

    return res.status(200).json({
      message: "User login successful",
      nonteachingstaff,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
