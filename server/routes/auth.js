const express = require("express");
const router = express();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

// register route

router.post("/register", async (req, res) => {
  const { username, email, password, profilePic, isAdmin } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
    profilePic,
    isAdmin,
  });

  try {
    const user = await newUser.save();
    res.status(201).json({ message: user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// login route
router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    !user && res.status(401).json({ message: "Wrong password or emial!" });

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json({ message: "Wrong password or email" });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    const { password, ...info } = user._doc;
    console.log("info", accessToken);
    res
      .status(200)
      .json({ message: "Login Success...", info, Token: accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
