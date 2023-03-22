const express = require("express");
const router = express.Router();
const { Results } = require("../../models");
const { verifyTokenAndTeacher } = require("../../helpers/jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
const { Students } = require("../../models");

// CREATE A Results***********************************************************
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

  try {
    // Capture user details*********************
    const newResults = {
      class: req.body.class,
      exam: {
        examname: req.body.exam,
        marks: [
          {
            subject: req.body.subject,
            mark: Number(req.body.mark),
            grade: req.body.grade,
          },
        ],
      },
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      term: req.body.term,
      attendence: req.body.attendence,
      marks: [
        {
          examname: req.body.examname,
          subject: req.body.subject,
          mark: Number(req.body.mark),
          grade: req.body.grade,
        },
      ],
      resultsId: generateResultsId(),
    };

    const results = await Results.findOne({
      where: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        class: req.body.class,
      },
    });

    if (results) {
      // Also check if the exam name has changed and create new exam(exam2 and keep on incrementing)
      //   const examSetResults = await Results.findOne({
      //   where: {
      //     firstname: req.body.firstname,
      //     lastname: req.body.lastname,
      //     exam: req.body.exam
      //   }
      // })

      await Results.update(
        {
          marks: Sequelize.literal(
            `JSON_ARRAY_APPEND(marks, '$', '{
              examname: ${JSON.stringify(req.body.examname)},
              subject: ${JSON.stringify(req.body.subject)},
              grade: ${JSON.stringify(req.body.grade)},
              mark: ${Number(req.body.mark)}}')`
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
      const student = await Students.findOne({
        where: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          clas: req.body.class,
        },
      });

      // Check if student with provided details exist in the students database,
      // and get his profile image from there and add it to his results
      if (student) {
        console.log(student);
        newResults.studentImage = student.profileimage;
      } else {
        console.log("No student");
      }
      //  Create Results, save him in the db and send response if there is a student
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

// Get results by subject name **********************************************
router.get("/getbysubject/:subjectname", async (req, res) => {
  try {
    const results = await Results.findAll({
      // where: Sequelize.literal(
      //   `JSON_CONTAINS(marks, '{"subject": "${req.params.subjectname}" }')`
      // ),
      // where: Sequelize.literal(
      //   `JSON_CONTAINS(marks, '{"subject": "${req.params.subjectname}" }')`
      // ),
      where: Sequelize.literal(
        `JSON_SEARCH(marks, 'all', '${req.params.subjectname}', null, '$[*].subject') IS NOT NULL`
      ),
    });

    const parsedResults = results?.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              return eval(`(${mark})`);
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              return eval(`(${mark})`);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: result.exam,
        firstname: result.firstname,
        lastname: result.lastname,
        studentImage: result.studentImage,
        attendence: result.attendence,
        term: result.term,
        marks,
        resultsId: result.resultsId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    });

    return res.status(200).json(parsedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

// Get results by exam name **********************************************
router.get("/getbyexam/exam/:examname", async (req, res) => {
  try {
    const results = await Results.findAll({
      where: Sequelize.literal(
        `JSON_CONTAINS(marks, '{"examname": "${req.params.examname}" }')`
      ),
    });

    const parsedResults = results?.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              return eval(`(${mark})`);
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              return eval(`(${mark})`);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: result.exam,
        firstname: result.firstname,
        lastname: result.lastname,
        studentImage: result.studentImage,
        attendence: result.attendence,
        term: result.term,
        marks,
        resultsId: result.resultsId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    });

    return res.status(200).json(parsedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

// UPDATE Results  **********************************************************
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

// GET Results  **************************************************************
router.get("/", async (req, res) => {
  try {
    const results = await Results.findAll();

    // Map over the results array and parse the marks string into a JSON object

    const parsedResults = results?.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              return eval(`(${mark})`);
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              return eval(`(${mark})`);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: JSON.parse(result.exam),
        firstname: result.firstname,
        lastname: result.lastname,
        studentImage: result.studentImage,
        attendence: result.attendence,
        term: result.term,
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

// GET Results BY ID  **********************************************************
router.get("/:id", async (req, res) => {
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

// GET Results BY Term  **********************************************************
router.get("/exam/:examName", async (req, res) => {
  try {
    const results = await Results.findAll({
      where: { exam: req.params.examName },
    });

    const parsedResults = results.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              // return JSON.parse(mark).replace(/\\/g, "");
              return eval(`(${mark})`);
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              // return JSON.parse(mark);
              return eval(`(${mark})`);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: result.exam,
        firstname: result.firstname,
        lastname: result.lastname,
        attendence: result.attendence,
        studentImage: result.studentImage,
        term: result.term,
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

// GET Results by class name  ******************************************************
router.get("/find/:class", async (req, res) => {
  try {
    const results = await Results.findAll({
      where: { class: req.params.class },
    });
    const parsedResults = results.map((result) => {
      const marks = Array.isArray(result.marks)
        ? result.marks.map((mark) => {
            if (typeof mark === "string") {
              // return JSON.parse(mark).replace(/\\/g, "");
              return eval(`(${mark})`);
            }
            return mark;
          })
        : JSON.parse(result.marks).map((mark) => {
            if (typeof mark === "string") {
              // return JSON.parse(mark);
              return eval(`(${mark})`);
            }
            return mark;
          });
      return {
        class: result.class,
        exam: result.exam,
        firstname: result.firstname,
        lastname: result.lastname,
        attendence: result.attendence,
        studentImage: result.studentImage,
        term: result.term,
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

// DELETE/DEACTIVATE USER  ******************************************************
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
