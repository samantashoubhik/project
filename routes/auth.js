const router = require("express").Router();
const nodemailer = require("nodemailer");

// user
const { User, Panding } = require("../models/User");
const { activeAccount } = require("../utils/emailTam");

//  * ragistration with form
router.post("/registration", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ errors: { msg: "user already exits" } });
    }
    let pandding = await Panding.findOne({ email });
    if (pandding) {
      return res.json({ errors: { msg: "already sent code" } });
    }
    const newUser = new Panding({
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
    await newUser.save();
    res.json(newUser);
    setTimeout(async () => {
      await Panding.findByIdAndDelete(newUser.id);
    }, 1000 * 60 * 60 * 24);
  } catch (err) {
    res.json(err.message);
  }
});

// * email varification

router.get("/:code", async (req, res) => {
  try {
    let user = await Panding.findOne({ code: req.params.code });
    if (!user) {
      return res.json({ errors: { msg: "Code is expired" } });
    }

    user = new User({
      username: user.username,
      password: user.password,
      email: user.email,
      varified: true,
      code: null,
    });
    await user.save();
    await Panding.findOneAndDelete({ code: req.params.code });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
});

// * registration with google and facebook

router.post("/", async (req, res) => {
  const { username, email, password, varified } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log(user);
    console.log(email);
    if (user) {
      return res.json({ errors: { msg: "user already exits" } });
    }
    const newUser = new User({
      username,
      email,
      password,
      varified,
      code: null,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
