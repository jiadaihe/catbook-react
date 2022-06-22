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

const {Plant, Moisture, Weather } = require("./models/plant")

const uri = "mongodb+srv://hjdcathy:aplrt5d5a1qtr48o@cluster0.vhjrw.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');

// Create a new MongoClient
const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongo.connect(err => {
  const weather = mongo.db("plantbook").collection("weather");
});
// const dummyPlant = new Plant({
//   name: "sunflower",
//   sensorId: "1"
// });
// dummyPlant.save();

// const dummyMoisture = new Moisture(
//   {
//     moisture: 92,
//     timestamp: new Date("2022-06-19T00:00:00.000+0000"),
//     meta: {
//       plantId: dummyPlant._id,
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
//       plantId: dummyPlant._id,
//       unit: "percent"
//     }
//   }
// );
// dummyMoisture2.save();


// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/plants", (req, res) => {
  Weather.find({}).then((plants) => res.send(plants));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
