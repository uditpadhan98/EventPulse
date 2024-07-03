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
  const userData = await getUserDataFromReq(req);
  const { event, startDate, endDate, name, phone } = req.body;
  Booking.create({
    event,
    startDate,
    endDate,
    name,
    phone,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/api/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("event"));
});

module.exports = router