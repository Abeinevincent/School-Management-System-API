const express = require("express");
const router = express.Router();
const { StoreManager } = require("../../models");
const {
  verifyToken,
  verifyTokenAndTeacher,
  verifyTokenAndAuthorization,
} = require("../../helpers/jsonwebtoken");

// CREATE A Store
router.post("/", verifyToken, async (req, res) => {
  // Generate userId with a custom function
  const generateStoreId = () => {
    let dt = new Date().getTime();
    let storeId = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return storeId;
  };

  // Capture user details
  const { itemImage, category, itemName, takenBy, itemQuantity } = req.body;
  const newStoreItem = {
    itemImage,
    category,
    itemName,
    itemQuantity,
    takenBy,
    storeId: generateStoreId(),
  };

  try {
    //  Create store, save it in the db and send response
    const store = await StoreManager.create(newStoreItem);
    return res
      .status(201)
      .json({ Message: "Store created successfully", store });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE STORE  ***********************
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await StoreManager.update(req.body, {
      where: { storeId: req.params.id },
    });
    return res.status(200).json("Store updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Exams  **************************
router.get("/", verifyToken, async (req, res) => {
  try {
    const store = await StoreManager.findAll();
    return res.status(200).json(store);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET Exam BY ID  **************************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const store = await StoreManager.findOne({
      where: { storeId: req.params.id },
    });
    return res.status(200).json(store);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE/DEACTIVATE USER  **************************
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await StoreManager.destroy({
      where: {
        storeId: req.params.id,
      },
    });
    return res.status(200).json("Store has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
