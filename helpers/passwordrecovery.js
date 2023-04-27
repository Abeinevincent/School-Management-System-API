const router = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  Users,
  Teachers,
  NonTeachingStaff,
  VerifyOTP,
  OTP,
} = require("../models");
const bcrypt = require("bcrypt");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

// Create a Nodemailer transporter object
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        type: process.env.TYPE,
        user: process.env.USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

router.post("/sendotp", async (req, res) => {
  const generateId = () => {
    let dt = new Date().getTime();
    let id = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return id;
  };

  try {
    const teacher = await Teachers.findOne({
      where: {
        email: req.body.email,
      },
    });

    const member = await NonTeachingStaff.findOne({
      where: {
        email: req.body.email,
      },
    });

    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!teacher && !user && !member) {
      return res.status(400).send("User with provided email doesn't exist");
    } else {
      await sendEmail(
        req.body.email,
        "Password Reset",
        `Your One Time Password is ${req.body.otp}. If you believe this was made in error, please ignore the email.`
      );
      //   const recoveryDetails = new OTP(req.body);

      // await recoveryDetails.save();

      await OTP.create({
        email: req.body.email,
        otp: req.body.otp,
        otpId: generateId(),
      });

      return res
        .status(201)
        .json("Password reset link sent to your email account");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/confirmotp", async (req, res) => {
  const generateId = () => {
    let dt = new Date().getTime();
    let id = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return id;
  };

  try {
    const otp = await OTP.findOne({ otp: req.body.otp, email: req.body.email });

    if (!otp) {
      return res.status(400).send("Incorrect otp provided!");
    } else {
      // const otpDetails = new VerifyOTP(req.body);
      // await otpDetails.save();
      await VerifyOTP.create({
        email: req.body.email,
        otp: req.body.otp,
        verifyOTPId: generateId(),
      });
      return res
        .status(200)
        .json({ message: "All good, you can now reset your password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/updatepassword", async (req, res) => {
  try {
    const teacher = await Teachers.findOne({
      where: {
        email: req.body.email,
      },
    });

    const member = await NonTeachingStaff.findOne({
      where: {
        email: req.body.email,
      },
    });

    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    if (!member && !user && !teacher) {
      return res.status(400).send("User with provided email doesn't exist");
    } else {
      user && (await user.update({ password: encryptedPassword }));
      teacher && (await teacher.update({ password: encryptedPassword }));
      member && (await member.update({ password: encryptedPassword }));

      return res.status(200).json("Password has been updated");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
