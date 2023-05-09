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

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiZWM5NDc3NTUtOWNkNS00YjFiLTg1ZTEtZGViNTViODE4N2VkIiwidWlkIjoiV1J6YldOL1l3UGdtN0V1ZTJTQ1Y1RzdWMjdPTUVYN20iLCJuYmYiOjE2ODM2MjgyOTcsImV4cCI6MTY4MzYyODU5NywiaWF0IjoxNjgzNjI4Mjk3LCJpc3MiOiJodHRwOi8vcGF5LnBlc2FwYWwuY29tLyIsImF1ZCI6Imh0dHA6Ly9wYXkucGVzYXBhbC5jb20vIn0.N3vrbXBgSOsOBkx44G2b8Nrt4tYhFPlwu4fzzWHBfsY";
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
            // Authorization: `Bearer ${generateToken()}`,
            Authorization: `Bearer ${token}}`,
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
