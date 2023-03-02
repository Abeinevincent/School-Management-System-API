const express = require("express");
const router = express.Router();
const { NonTeachingStaff } = require("../../models");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndTeacher,
  verifyTokenAndNonteachingstaff,
} = require("../../helpers/jsonwebtoken");

// CREATE NON TEACHING STAFF
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
    department: req.body.department,
    educationlevel: req.body.educationlevel,
    maritalstatus: req.body.maritalstatus,
    role: req.body.role,
    rank: req.body.rank,
    profileimage: req.body.profileimage,
    contact: req.body.contact,
    dateofbirth: req.body.dateofbirth,
    password: req.body.password,
    nonteachingstaffId: generateUserId(),
  };

  const nonteachingstaff = await NonTeachingStaff.findOne({
    where: { username: req.body.username },
  });
  if (nonteachingstaff) {
    return res
      .status(500)
      .json(
        `User with username: (${req.body.username}) already exists, try again.`
      );
  } else {
    try {
      //   Create nonteachingstaff, save him in the db and send response
      const nonteachingstaff = await NonTeachingStaff.create(newUser);
      return res.status(201).json({
        message: "nonteachingstaff created successfully",
        nonteachingstaff,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

// UPDATE nonteachingstaff  ***********************
router.put("/:id", verifyTokenAndNonteachingstaff, async (req, res) => {
  try {
    await NonTeachingStaff.update(req.body, {
      where: { nonteachingstaffId: req.params.id },
    });
    return res
      .status(200)
      .json({ message: "nonteachingstaff updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET NonTeachingStaff  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const nonteachingstaff = await NonTeachingStaff.findAll();
    return res.status(200).json(nonteachingstaff);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET nonteachingstaff BY ID  **************************
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const nonteachingstaff = await NonTeachingStaff.findOne({
      where: { nonteachingstaffId: req.params.id },
    });
    return res.status(200).json(nonteachingstaff);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await NonTeachingStaff.destroy({
      where: {
        nonteachingstaffId: req.params.id,
      },
    });
    return res.status(200).json("nonteachingstaff has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
