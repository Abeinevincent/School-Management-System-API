const express = require("express");
const router = express.Router();
const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const { verifyTokenAndAdmin } = require("../../helpers/jsonwebtoken");

// UPDATE USER  ***********************
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    await Users.update(req.body, { where: { userId: req.params.id } });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET USERS  **************************
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET USER BY ID  **************************
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { userId: req.params.id } });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await Users.destroy({
      where: {
        userId: req.params.id,
      },
    });
    return res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
