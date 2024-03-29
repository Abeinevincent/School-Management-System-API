const express = require("express");
const router = express.Router();
const { ClassFees } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
  verifyTokenAndAdmin,
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
    amount: req.body.amount,
    classfeeId: generateFeeId(),
  };

  try {
    //  Create Fee, save him in the db and send response
    const fees = await ClassFees.create(newFee);
    return res.status(201).json({ fees: "Fee created successfully", fees });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Fees  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const fees = await ClassFees.findAll();
    return res.status(200).json(fees);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE CLASS FEE************************************
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await ClassFees.update(req.body, {
      where: { classfeeId: req.params.id },
    });
    return res.status(200).json({ fees: "Class fee updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Fee BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const fees = await ClassFees.findOne({
      where: { classfeeId: req.params.id },
    });
    return res.status(200).json(fees);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET FEE BY CLASSNAME  **************************
router.get("/findbyclass/:classname", verifyToken, async (req, res) => {
  try {
    const fees = await ClassFees.findOne({
      where: { class: req.params.classname },
    });
    return res.status(200).json(fees);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE CLASS FEES  ****************************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await ClassFees.destroy({
      where: {
        classfeeId: req.params.id,
      },
    });
    return res.status(200).json("Class fee has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
