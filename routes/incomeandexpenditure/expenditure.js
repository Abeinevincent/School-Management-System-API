const express = require("express");
const { verifyToken } = require("../../helpers/jsonwebtoken");
const router = express.Router();
const { Expenditures } = require("../../models");

// CREATE A EXPENDITURE
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
  const { itemname, amount, category } = req.body;

  const newExpenditure = {
    itemname,
    amount,
    category,
    expenditureId: generateId(),
  };

  try {
    //  Create expenditure, save it in the db and send response
    const expenditures = await Expenditures.create(newExpenditure);

    return res
      .status(201)
      .json({ message: "Expenditures created successfully", expenditures });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET SINGLE EXPENDITURE
router.get("/", verifyToken, async (req, res) => {
  try {
    const expenditure = await Expenditures.findAll();

    return res.status(200).json(expenditure);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE EXPENDITURE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Expenditures.destroy({
      where: {
        expenditureId: req.params.id,
      },
    });
    return res.status(200).json("Expenditure has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET SINGLE EXPENDITURE
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const expenditure = await Expenditures.findOne({
      where: { expenditureId: req.params.id },
    });
    return res.status(200).json(expenditure);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE EXPENDITURE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await Expenditures.update(req.body, {
      where: { expenditureId: req.params.id },
    });
    return res
      .status(200)
      .json({ message: "Expenditure updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
