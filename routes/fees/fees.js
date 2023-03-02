const express = require("express");
const router = express.Router();
const { Fees } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
  verifyTokenAndAuthorization,
} = require("../../helpers/jsonwebtoken");

// CREATE A Fee
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateFeeId = () => {
    let dt = new Date().getTime();
    let accountId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return accountId;
  };

  // Capture user details
  const newFee = {
    class: req.body.class,
    paymentReference: req.body.paymentReference,
    studentName: req.body.studentName,
    accountType: req.body.accountType,
    accountNumber: req.body.accountNumber,
    amount: req.body.amount,
    accountId: generateFeeId(),
  };

  try {
    //  Create Fee, save him in the db and send response
    const fees = await Fees.create(newFee);
    return res.status(201).json({ fees: "Fee created successfully", fees });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Fee  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Fees.update(req.body, {
      where: { accountId: req.params.id },
    });
    return res.status(200).json({ fees: "Fee updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Fees  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const fees = await Fees.findAll();
    return res.status(200).json(fees);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Fee BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const fees = await Fees.findOne({
      where: { accountId: req.params.id },
    });
    return res.status(200).json(fees);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Fees.destroy({
      where: {
        accountId: req.params.id,
      },
    });
    return res.status(200).json("Fee has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
