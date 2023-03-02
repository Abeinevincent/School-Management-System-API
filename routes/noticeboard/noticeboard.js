const express = require("express");
const router = express.Router();
const { NoticeBoard } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A NoticeBoard
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateNoticeBoardId = () => {
    let dt = new Date().getTime();
    let noticeboardId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return noticeboardId;
  };

  // Capture user details
  const newNoticeBoard = {
    title: req.body.title,
    username: req.body.username,
    info: req.body.info,
    noticeId: generateNoticeBoardId(),
  };

  try {
    //  Create NoticeBoard, save him in the db and send response
    const notice = await NoticeBoard.create(newNoticeBoard);
    return res
      .status(201)
      .json({ message: "NoticeBoard created successfully", notice });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE NoticeBoard  ***********************
router.put("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await NoticeBoard.update(req.body, {
      where: { noticeId: req.params.id },
    });
    return res
      .status(200)
      .json({ message: "NoticeBoard updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET NoticeBoards  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const noticeboard = await NoticeBoard.findAll();
    return res.status(200).json(noticeboard);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET NoticeBoard BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const notice = await NoticeBoard.findOne({
      where: { noticeId: req.params.id },
    });
    return res.status(200).json(notice);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await NoticeBoard.destroy({
      where: {
        noticeboardId: req.params.id,
      },
    });
    return res.status(200).json("NoticeBoard has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
