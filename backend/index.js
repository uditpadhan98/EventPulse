const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/User.js");
const eventsRoutes = require("./routes/Events.js");
const bookingRoutes = require("./routes/Booking.js");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.BASE,
  })
);

app.use("/", userRoutes);
app.use("/", eventsRoutes);
app.use("/", bookingRoutes);

const PORT = 4000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Connected on Server Port: ${PORT}`));
    // console.log(process.env.BASE);
  })
  .catch((err) => console.log(`${err} did not connect`));

app.get("/", (req, res) => {
  res.json("test ok");
});
