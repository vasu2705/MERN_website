const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("../db/conn");
const authenticate = require("../middleware/authenticate");
const User = require("../models/userschema");

//====================================================== asycronus javascript =========================================
router.post("/signup", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "data is not inserted" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log("me email chal gya");
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      console.log("me chal gya password vala");
      return res.status(422).json({ error: "recheck password" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      // =============================hasing =============================
      await user.save();
      console.log("me chal gya");
      res.status(201).json({ message: "successfully saved." });
    }
  } catch (err) {
    console.log(err);
  }
});

//============================login route ===============================
router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill data" });
    }
    const userlogin = await User.findOne({ email: email });

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      // =====================================  token ============================
      token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "invaild ho bhia tum" });
      } else {
        res.json({ message: "successfully login h tu bhia khush hoja" });
      }
    } else {
      res.status(400).json({ error: "invaild h bhia tu" });
    }
    // ==============================bycript for login functionality =================================
  } catch (err) {
    console.log(err);
  }
});

//===============================about us page============================
router.get("/about", authenticate, (req, res) => {
  console.log("hello i am about");
  res.send(req.UserRoot);
});
//================ user data for contact us and home   ========================
router.get("/getdata", authenticate, (req, res) => {
  console.log("hello guys swagat ni kroge humara");
  res.send(req.UserRoot);
});
//================= contact us page ===================================

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.json({ error: "plzz filled bhar do yrrr" });
    } else {
      const userContact = await User.findOne({ _id: req.userID });
      if (userContact) {
        const userMessage = await userContact.addMessage(
          name,
          email,
          phone,
          message
        );

        await userContact.save();

        res.status(201).json({ message: "successfully saved." });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
// ======================== logout page =================================
router.get("/logout", (req, res) => {
  // console.log("hello i am logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
