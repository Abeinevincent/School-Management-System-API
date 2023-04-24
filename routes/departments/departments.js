const express = require("express");
const { verifyToken } = require("../../helpers/jsonwebtoken");
const router = express.Router();
const { Departments } = require("../../models");

// CREATE A DEPARTMENT
router.post("/", verifyToken, async (req, res) => {
  // Generate userId with a custom function
  const generateId = () => {
    let dt = new Date().getTime();
    let id = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return id;
  };

  // Capture user details
  const { name, subdeps, code, image } = req.body;
  //   let startValue = code;
  //   for (let i = 0; i < 10; i++) {
  //     startValue += 1;
  //   }
  const newDep = {
    name,
    subdeps,
    code,
    image,
    deptId: generateId(),
  };

  try {
    //  Create department, save it in the db and send response
    const depts = await Departments.create(newDep);

    return res
      .status(201)
      .json({ message: "Department created successfully", depts });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET SINGLE DEPARTMENT
router.get("/", verifyToken, async (req, res) => {
  try {
    const dept = await Departments.findAll();
    dept.forEach((dept) => {
      dept.subdeps = JSON.parse(dept.subdeps);
    });

    return res.status(200).json(dept);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE DEPARTMENT
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Departments.destroy({
      where: {
        deptId: req.params.id,
      },
    });
    return res.status(200).json("Department has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET SINGLE DEPARTMENT
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const depts = await Departments.findOne({
      where: { deptId: req.params.id },
    });
    return res.status(200).json(depts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE DEPARTMENT
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await Departments.update(req.body, {
      where: { deptId: req.params.id },
    });
    return res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
