const express = require("express");
const router = express.Router();
const { Subject } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A Subject
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateSubjectId = () => {
    let dt = new Date().getTime();
    let subjectID = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return subjectID;
  };

  // Capture user details
  const newSubject = {
    subjectAbbrev: req.body.subjectAbbrev,
    subjectName: req.body.subjectName,
    className: req.body.className,
    subjectTeacher: req.body.subjectTeacher,
    subjectId: generateSubjectId(),
  };

  const subject = await Subject.findOne({
    where: { subjectName: req.body.subjectName },
  });
  if (subject) {
    return res
      .status(500)
      .json(
        `Subject with name: (${req.body.subjectName}) already exists, try again.`
      );
  } else {
    try {
      //  Create Subject, save him in the db and send response
      const subject = await Subject.create(newSubject);
      return res
        .status(201)
        .json({ message: "Subject created successfully", subject });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// UPDATE Subject  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Subject.update(req.body, {
      where: { subjectId: req.params.id },
    });
    return res.status(200).json({ message: "Subject updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Subjects  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    return res.status(200).json(subjects);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Subject BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const subject = await Subject.findOne({
      where: { SubjectId: req.params.id },
    });
    return res.status(200).json(subject);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Subject.destroy({
      where: {
        subjectId: req.params.id,
      },
    });
    return res.status(200).json("Subject has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
