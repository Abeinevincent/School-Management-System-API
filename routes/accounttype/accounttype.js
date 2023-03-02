const express = require("express");
const router = express.Router();
const { AccountType } = require("../../models");
// const {generateId} = require('../../helpers/idGenerator')
const {
  verifyToken,
  verifyTokenAndTeacher,
  verifyTokenAndAuthorization,
} = require("../../helpers/jsonwebtoken");
// const AccountType = require("../../models/AccountType");

// CREATE ACCOUNT TYPE
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const generateId = () => {
    let dt = new Date().getTime();
    let id = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return id;
  };
  const newAccountType = {
    accountType: req.body.accountType,
    accountId: generateId(),
  };
  try {
    const acctype = await AccountType.create(newAccountType);
    return res
      .status(201)
      .json({ message: "Account type created successfully", acctype });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// // UPDATE Fee  ***********************
// router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
//   try {
//     await Fees.update(req.body, {
//       where: { accountId: req.params.id },
//     });
//     res.status(200).json({ fees: "Fee updated successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// GET ACCOUNTTYPES  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const fees = await AccountType.findAll();
    return res.status(200).json(fees);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// // GET Fee BY ID  **************************
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const fees = await Fees.findOne({
//       where: { accountId: req.params.id },
//     });
//     res.status(200).json(fees);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // DELETE/DEACTIVATE USER  **************************
// router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
//   try {
//     await Fees.destroy({
//       where: {
//         accountId: req.params.id,
//       },
//     });
//     res.status(200).json("Fee has been deleted");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
