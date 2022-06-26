const mongoose = require("mongoose");

const MoistureSchema = new mongoose.Schema(
    {
        moisture: Number,
        timestamp: Date,
        metadata: {
            unit: String,
            sensorId: String,
        }
    },
    {
        timeseries: {
            timeField: "timestamp",
            metaField: "metadata",
            granularity: "hours",
        },
        // expireAfterSeconds: 86400
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


// compile model from schema
const Plant = mongoose.model("Plant", PlantSchema);
const Moisture = mongoose.model("Moisture", MoistureSchema);
// const Temperature = mongoose.model("Temperature", TemperatureSchema);

module.exports = {Plant, Moisture};
