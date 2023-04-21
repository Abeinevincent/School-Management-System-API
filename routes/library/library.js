const express = require("express");
const router = express.Router();
const { Library } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
} = require("../../helpers/jsonwebtoken");

// CREATE A Library
router.post("/", verifyTokenAndTeacher, async (req, res) => {
  // Generate userId with a custom function
  const generateLibraryId = () => {
    let dt = new Date().getTime();
    let libraryId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return libraryId;
  };

  // Capture user details
  const {
    className,
    subjectName,
    releasedAgainst,
    bookAuthor,
    bookTitle,
    publication,
    userId,
    status,
  } = req.body;
  const newLibrary = {
    className,
    subjectName,
    bookAuthor,
    bookTitle,
    publication,
    userId,
    status,
    releasedAgainst,
    libraryId: generateLibraryId(),
  };

  try {
    //  Create Library, save him in the db and send response
    const library = await Library.create(newLibrary);
    return res
      .status(201)
      .json({ library: "Library created successfully", library });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE Library  ***********************
router.put("/", verifyTokenAndTeacher, async (req, res) => {
  try {
    const bookToUpdate = await Library.findOne({
      where: {
        bookTitle: req.body.bookTitle,
      },
    });

    await Library.update(req.body, {
      where: {
        bookTitle: req.body.bookTitle,
      },
    });
    return res.status(200).json({ library: "Library updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Librarys  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const library = await Library.findAll();
    return res.status(200).json(library);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Library BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const library = await Library.findOne({
      where: { libraryId: req.params.id },
    });
    return res.status(200).json(library);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyTokenAndTeacher, async (req, res) => {
  try {
    await Library.destroy({
      where: {
        libraryId: req.params.id,
      },
    });
    return res.status(200).json("Library has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
