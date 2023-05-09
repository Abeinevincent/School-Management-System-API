const express = require("express");
const router = express.Router();
const { Fees } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");
const axios = require("axios");

// CREATE A Fee
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

router.post("/", verifyToken, async (req, res) => {
  // Capture user details
  const {
    contact,
    transaction_reference,
    studentName,
    accountNumber,
    termname,
    amount,
    bankname,
    scheme,
    accountType,
    classFeesAMount,
    paymentReference,
  } = req.body;
  const newFee = {
    bankname,
    class: req.body.class,
    paymentReference,
    studentName,
    accountType,
    accountNumber,
    amount,
    scheme,
    termname,
    contact,
    transaction_reference,
    classFeesAMount,
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










// *****************************************************************************************************

// INITIATE MOMO PAYMENT *******************************************************
// INITIATE PAYMENT ***********************************************************
router.post("/payment", async (req, res) => {
  // GENERATE UNIQUE REFERENCE
  const generateRef = () => {
    let dt = new Date().getTime();
    let ref = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return ref;
  };

  const transactionRef = generateRef();
  const data = {
   
  };

  // Define the headers to be sent in the POST request
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`, // Replace with your API key
  };

  try {
    // Make the POST request using axios
    const response = await axios.post(`${process.env.PAYMENT_URL}`, data, {
      headers,
    });

    console.log(response.config.data, "res.config.data"); // Handle the response from the external API
    console.log(response.data, "res.data"); // Handle the response from the external API

















    // CREATE A NEW FEE AND SAVE IT IN DB, WE WILL UPDTATE IN IPN OR FPN ACCORDINGLY
    const { studentName, amount, scheme, termname, contact, classFeesAMount } =
      req.body;

    const savedDetails = await Fees.create({
      studentName,
      amount,
      scheme,
      class: req.body.class,
      termname,
      contact,
      transaction_reference: transactionRef,
      classFeesAMount,
      accountId: generateFeeId(),
    });

    return res.status(201).send(response.data); // Send a success response to the client
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});














// ***************************************************************************************************

// UPDATE Fee  ****************************************************************
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

// DELETE FEES  ****************************************
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
