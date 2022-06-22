const mongoose = require("mongoose");

const MoistureSchema = new mongoose.Schema(
    {
        moisture: Number,
        ts: Date,
        meta: {
            plantId: String,
            unit: String,
            sensorId: String,
        }
    },
    {
        timeseries: {
            timeField: "ts",
            metaField: "meta",
            granularity: "hours",
        }
    }
);

// const TemperatureSchema = new mongoose.Schema(
//     {
//         temperature: Number,
//         timestamp: Date,
//         meta: {
//             plantId: String,
//             unit: String,
//         }
//     },
//     {
//         timeseries: {
//             timeField: "timestamp",
//             metaField: "meta",
//             granularity: "hours",
//         }
//     }
// );

const PlantSchema = new mongoose.Schema({
  name: String,
  sensorId: String
});

const weatherSchema = new mongoose.Schema(
    {
      timestamp: {
        type: Date,
      },
      temp: Number,
      metadata: { sensorId: String, type: String}
    },
    {
      timeseries: {
        timeField: "timestamp",
        metaField: "metadata",
        granularity: "hours"
      },
    }
  );
  
const Weather = mongoose.model("weather", weatherSchema);
  

// compile model from schema
const Plant = mongoose.model("Plant", PlantSchema);
const Moisture = mongoose.model("Moisture", MoistureSchema);
// const Temperature = mongoose.model("Temperature", TemperatureSchema);

module.exports = {Plant, Moisture, Weather};
