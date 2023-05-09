const express = require("express");
const router = express.Router();
const axios = require("axios");

// INITIATE MOMO PAYMENT *******************************************************

router.post("/initiatepayment", async (req, res) => {
  // Define the headers to be sent in the POST request
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const generateToken = async () => {
    try {
      // Make the POST request using axios
      const response = await axios.post(
        `${process.env.PESAPAL_TOKEN_GENERATOR_URL}`,
        {
          consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
          consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        },
        {
          headers,
        }
      );
      return res.status(200).json(response.data.token);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };

  // REGISTER IPN URL
  const registerIPNUrl = async () => {
    try {
      const response = await axios.post(
        `${process.env.PESAPAL_TOKEN_IPN_REGISTRAR}`,
        {
          URL: process.env.IPN_URL,
          ipn_notification_type: process.env.IPN_NOTIICATION_TYPE,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${generateToken()}`,
          },
        }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      console.log(error, error.message);
      console.error("Failed to register IPN URL:", error.message);
      console.error("Server response:", error.response.data);
      return res.status(500).send(error);
    }
  };
  registerIPNUrl();
});

module.exports = router;
