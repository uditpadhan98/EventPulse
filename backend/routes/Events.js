const router = require("express").Router();
const Event = require("../models/Event.js");
const jwt = require("jsonwebtoken");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

router.post("/api/events", (req, res) => {
  const { token } = req.cookies;
  const { title, address, addedPhotos, description, startDate, time } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      startDate,
      time,
    });
    res.json(eventDoc);
  });
});

router.get("/api/user-events", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Event.find({ owner: id }));
  });
});

router.get("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Event.findById(id));
});

router.put("/api/events", async (req, res) => {
  const { token } = req.cookies;
  const { id, title, address, addedPhotos, description, startDate, time } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.findById(id);
    if (userData.id === eventDoc.owner.toString()) {
      eventDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        startDate,
        time,
      });
      await eventDoc.save();
      res.json("ok");
    }
  });
});

router.get("/api/events", async (req, res) => {
  res.json(await Event.find());
});

module.exports = router