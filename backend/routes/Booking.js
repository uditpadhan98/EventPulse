const router = require("express").Router();
const Booking = require("../models/Booking.js");
const jwt = require("jsonwebtoken");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

router.post("/api/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const { event, name, phone } = req.body;

    const booking = await Booking.create({
      event,
      name,
      phone,
      user: userData.id,
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error.message === 'No token provided' || error === 'Invalid token') {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.get("/api/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("event"));
});

module.exports = router