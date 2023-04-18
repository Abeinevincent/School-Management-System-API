const express = require("express");
const router = express.Router();
const { Sylabus } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A Sylabus
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateSylabusId = () => {
    let dt = new Date().getTime();
    let sylabusID = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return sylabusID;
  };

  // Capture user details
  const newSylabus = {
    subjectName: req.body.subjectName,
    className: req.body.className,
    subjectFile: req.body.subjectFile,
    sylabusId: generateSylabusId(),
  };

  try {
    //  Create Sylabus, save him in the db and send response
    const sylabus = await Sylabus.create(newSylabus);
    return res
      .status(201)
      .json({ message: "Sylabus created successfully", sylabus });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Sylabus  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Sylabus.update(req.body, {
      where: { sylabusId: req.params.id },
    });
    return res.status(200).json({ message: "Sylabus updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Sylabuss  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const sylabuss = await Sylabus.findAll();
    return res.status(200).json(sylabuss);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Sylabus BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const sylabus = await Sylabus.findOne({
      where: { SylabusId: req.params.id },
    });
    return res.status(200).json(sylabus);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE SYLABUS  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Sylabus.destroy({
      where: {
        sylabusId: req.params.id,
      },
    });
    return res.status(200).json("Sylabus has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
