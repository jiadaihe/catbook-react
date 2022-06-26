/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("611858752244-nln1lv5gg219d3v8pdddig8b24vl01sb.apps.googleusercontent.com");

const {Plant, Moisture } = require("./models/plant")

// const dummyPlant = new Plant({
//   name: "sunflower",
//   sensorId: 1
// });
// dummyPlant.save();


// const dummyMoisture = new Moisture(
//   {
//     moisture: 92,
//     timestamp: new Date("2022-6-8, 15:20:18"),
//     metadata: {
//       sensorId: 1,
//       unit: "percent"
//     }
//   },
// );
// dummyMoisture.save();

// const dummyMoisture2 = new Moisture(
//   {
//     moisture: 87,
//     timestamp: new Date(),
//     meta: {
//       sensorId: 2,
//       unit: "percent"
//     }
//   }
// );
// dummyMoisture2.save();


// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/moistures", (req, res) => {
  Moisture.find({'metadata.sensorId': 1}).then((moistures) => res.send(moistures));
});

router.get("/plants", (req, res) => {
  Plant.find({}).then((plants) => res.send(plants));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
