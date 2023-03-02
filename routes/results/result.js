const express = require("express");
const router = express.Router();
const { Results } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");
const { Sequelize, Op } = require("sequelize");

// CREATE A Results
router.post("/", async (req, res) => {
  // Generate userId with a custom function
  const generateResultsId = () => {
    let dt = new Date().getTime();
    let resultsId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return resultsId;
  };

  // Capture user details
  const newResults = {
    class: req.body.class,
    exam: req.body.exam,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    attendence: req.body.attendence,
    marks: [
      {
        [req.body.subject]: Number(req.body.mark),
      },
    ],
    resultsId: generateResultsId(),
  };

  try {
    const results = await Results.findOne({
      where: { firstname: req.body.firstname, lastname: req.body.lastname },
    });

    if (results) {
      // First, check if the subject already exists in the marks JSON
      // const result = await Results.findOne({
      //   where: {
      //     marks: {
      //       [Op.and]: Sequelize.literal(
      //         `JSON_CONTAINS(marks, '${req.body.subject}')`
      //       ),
      //     },
      //   },
      // });

      // if (result) {
      // If the subject exists, return a 400 error
      // return res.status(400).json({
      //   message: `Subject, ${req.body.subject} already exists for this student`,
      // });
      // } else {
      await Results.update(
        {
          marks: Sequelize.literal(
            `JSON_ARRAY_APPEND(marks, '$', '{${JSON.stringify(
              req.body.subject
            )}: ${JSON.parse(req.body.mark)}}')`
          ),
        },
        {
          where: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          },
        }
      );
      return res.status(200).json("Results updated successfully");
      // }
    } else {
      //  Create Results, save him in the db and send response
      const result = await Results.create(newResults);
      return res
        .status(201)
        .json({ message: "Results created successfullDatey", result });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Results  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Results.update(req.body, {
      where: { resultsId: req.params.id },
    });
    return res.status(200).json({ message: "Results updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Results  **************************
router.get("/", async (req, res) => {
  try {
    const results = await Results.findAll();

    // Map over the results array and parse the marks string into a JSON object

    const parsedResults = results.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              return JSON.parse(mark).replace(/\\/g, "");
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              return JSON.parse(mark);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: result.exam,
        firstname: result.firstname,
        lastname: result.lastname,
        attendence: result.attendence,
        marks,
        resultsId: result.resultsId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    });

    return res.status(200).json(parsedResults);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Results BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const result = await Results.findOne({
      where: { resultsId: req.params.id },
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Results by class name  **************************
router.get("/find/:class", async (req, res) => {
  try {
    const results = await Results.findAll({
      where: { class: req.params.class },
    });
    const parsedResults = results.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              return JSON.parse(mark).replace(/\\/g, "");
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              return JSON.parse(mark);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: result.exam,
        firstname: result.firstname,
        lastname: result.lastname,
        attendence: result.attendence,
        marks,
        resultsId: result.resultsId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    });

    return res.status(200).json(parsedResults);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Results.destroy({
      where: {
        resultsId: req.params.id,
      },
    });
    return res.status(200).json("Results has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
