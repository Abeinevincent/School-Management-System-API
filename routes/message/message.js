const express = require("express");
const router = express.Router();
const { Message } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A Message
router.post("/", verifyToken, async (req, res) => {
  // Generate userId with a custom function
  const generateMessageId = () => {
    let dt = new Date().getTime();
    let messageId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return messageId;
  };

  // Capture user details
  const { receiverName, title, senderId, message } = req.body;
  const newMessage = {
    title,
    senderId,
    receiverName,
    message,
    messageId: generateMessageId(),
  };

  try {
    //  Create Message, save him in the db and send response
    const message = await Message.create(newMessage);
    return res
      .status(201)
      .json({ message: "Message created successfully", message });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Message  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Message.update(req.body, {
      where: { messageId: req.params.id },
    });
    res.status(200).json({ message: "Message updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Messages  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const message = await Message.findAll();
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Message BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const message = await Message.findOne({
      where: { messageId: req.params.id },
    });
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Message.destroy({
      where: {
        messageId: req.params.id,
      },
    });
    return res.status(200).json("Message has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
