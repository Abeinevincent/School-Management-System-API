const express = require("express");
const { verifyToken } = require("../../helpers/jsonwebtoken");
const router = express.Router();
const { Incomes } = require("../../models");

// CREATE A INCOME
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
  const { itemname, image, amount, category } = req.body;

  const newIncome = {
    itemname,
    image,
    amount,
    category,
    incomeId: generateId(),
  };

  try {
    //  Create income, save it in the db and send response
    const incomes = await Incomes.create(newIncome);

    return res
      .status(201)
      .json({ message: "Incomes created successfully", depts });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET SINGLE INCOME
router.get("/", verifyToken, async (req, res) => {
  try {
    const income = await Incomes.findAll();

    return res.status(200).json(income);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE INCOME
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Incomes.destroy({
      where: {
        incomeId: req.params.id,
      },
    });
    return res.status(200).json("Income has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET SINGLE INCOME
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const income = await Incomes.findOne({
      where: { incomeId: req.params.id },
    });
    return res.status(200).json(income);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE INCOME
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await Incomes.update(req.body, {
      where: { incomeId: req.params.id },
    });
    return res.status(200).json({ message: "Income updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
