const router = require("express").Router();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// google
const GOOGLE_CONSUMER_KEY =
  "31144990250-af7v037tre8euf10tg1o4am9b8oaj5ll.apps.googleusercontent.com";
const GOOGLE_CONSUMER_SECRET = "eYP9Lf6n1PUYCU6Mr1dt6SDh";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CONSUMER_KEY,
      clientSecret: GOOGLE_CONSUMER_SECRET,
      callbackURL: "/playground/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accees token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
    }
  )
);

// facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: "188474982588826",
      clientSecret: "dcee932568a22364cfce76d70c3aa3a5",
      callbackURL: "/playgound/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("access token", accessToken);
      console.log("refresh", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
    }
  )
);

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/fb", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
  })
);

router.get("/auth/google/callback", passport.authenticate("google"));

// user
const { User } = require("../models/Posts");
const nodemailer = require("nodemailer");
const { activeAccount } = require("../utils/emailTam");

router.post("/auth", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // const user = await User.findOne({ email });
    // if (!user) {
    //   return res.json({ errors: { msg: "User not found" } });
    // }
    const newUser = new User({
      username,
      email,
      password,
      varified: false,
      code: Math.floor(Math.random() * 100000),
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 554,
      secure: false,
      auth: {
        user: "sabujhasansarker@gmail.com",
        pass: "sabujsarker",
      },
    });
    // const url =
    //   req.protocol + "://" + req.get("host") + "/playground/" + newUser.id;
    var mailOptions = {
      from: "sabujhasansarker@gmail.com",
      to: email,
      subject: `${newUser.code} is your Story Books account active code`,
      html: activeAccount(newUser.username, newUser.code),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // await newUser.save();
    res.json(newUser);
    setTimeout(async () => {
      await User.findByIdAndUpdate(
        newUser.id,
        { $set: { code: null } },
        { new: true }
      );
    }, 120000);
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
});

router.get("/:code", async (req, res) => {
  try {
    let user = await User.findOne({ code: req.params.code });
    if (!user) {
      return res.json({ errors: { msg: "Code is expired" } });
    }
    user = await User.findOneAndUpdate(
      { code: req.params.code },
      { $set: { varified: true } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
});

module.exports = router;
