const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

router.post("/api/register", async (req, res) => {
  const { name, email, password, club } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Create new user
    const userDoc = await User.create({
      name,
      email,
      club,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.status(201).json(userDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).json({ error: "Email not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(422).json({ error: "Password not correct" });
    }

    jwt.sign(
      {
        email: userDoc.email,
        club: userDoc.club,
        id: userDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        res.cookie("token", token,{ sameSite: "None", secure: true }).status(200).json(userDoc);
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, club } = await User.findById(userData.id);
      res.json({ name, email, _id, club });
    });
  } else {
    res.json(null);
  }
});

router.post("/api/logout", (req, res) => {
  res.cookie("token", "",{ sameSite: "None", secure: true }).json(true);
});

module.exports = router;
