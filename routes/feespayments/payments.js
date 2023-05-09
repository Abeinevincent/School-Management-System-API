const express = require("express");
const router = express.Router();
const axios = require("axios");
const { verifyToken } = require("../../helpers/jsonwebtoken");

// Generate userId with a custom function
const generateUniqueId = () => {
  let dt = new Date().getTime();
  let id = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return id;
};

router.post("/initiatepayment", verifyToken, async (req, res) => {
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
      const token = response.data.token;

      //   REGISTER IPN URL
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
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ipnId = response.data.ipn_id;

        // return res.status(200).json(response.data);

        // Initiate payment on users phone(momo)
        const { amount, phone_number } = req.body;
        try {
          const dataFromUser = {
            id: generateUniqueId(),
            currency: "UGX",
            amount: amount,
            description: process.env.DESCRIPTION,
            callback_url: process.env.CALLBACK_URL,
            redirect_mode: "",
            notification_id: ipnId,
            branch: "Rwebiita PS",
            billing_address: {
              email_address: process.env.DEFAULT_EMAIL,
              phone_number,
              country_code: "UG",
              first_name: "John",
              middle_name: "",
              last_name: "Doe",
              line_1: "Rwebita PS",
              line_2: "",
              city: "",
              state: "",
              postal_code: "",
              zip_code: "",
            },
          };

          const response = await axios.post(
            `${process.env.PROMPT_INITITATION_URL}`,
            dataFromUser,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return res.status(200).json(response.data);
        } catch (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };

  generateToken();
});

module.exports = router;
