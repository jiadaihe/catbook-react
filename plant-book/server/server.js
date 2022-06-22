const uri = "mongodb+srv://hjdcathy:aplrt5d5a1qtr48o@cluster0.vhjrw.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');

// Create a new MongoClient
const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongo.connect(err => {
//     console.log("Connected to MongoDB server...");
// 	// mongo.db("plantbook").createCollection("weather", {
//     //     timeseries: {
//     //         timeField: "timestamp",
//     //         metaField: "metadata",
//     //         granularity: "hours"
//     //     }
//     // }); // substitute your database and collection names
//     const weather = mongo.db("plantbook").collection("weather");
//     const date1 = new Date();
//     const date2 = new Date("Sept 24, 21 14:20:18");
//     const date3 = new Date("2022-6-8, 15:20:18");
//     weather.insertMany([
//         {
//             "metadata": { "sensorId": 5578, "type": "temperature" },
//             "timestamp": date1,
//             "temp": 12
//         },
//         {
//             "metadata": { "sensorId": 5578, "type": "temperature" },
//             "timestamp": date3,
//             "temp": 11
//         },
//     ]);
//     weather.find({}).toArray(function(err, result) {
//         console.log("find query executed...")    
//         console.log(result)
// 	});
// });

// import libraries needed for the webserver to work!
const http = require("http");
const bodyParser = require("body-parser"); // allow node to automatically parse POST body requests as JSON
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths

const api = require("./api");


// Server configuration below
// TODO change connection URL after setting up your own database
const mongoConnectionURL =
    "mongodb+srv://hjdcathy:aplrt5d5a1qtr48o@cluster0.vhjrw.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "plantbook";

// connect to mongodb
mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// create a new express server
const app = express();

// set up bodyParser, which allows us to process POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up a session, which will persist login data across requests
app.use(
    session({
        secret: "session-secret",
        resave: false,
        saveUninitialized: false,
    })
);

// connect user-defined routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
    res.sendFile(path.join(reactPath, "index.html"));
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status === 500) {
        // 500 means Internal Server Error
        console.log("The server errored when processing a request!");
        console.log(err);
    }

    res.status(status);
    res.send({
        status: status,
        message: err.message,
    });
});

async function placeOrder(client, cart, payment) {
    const transactionOptions = {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' },
        readPreference: 'primary'
    };

    const session = client.startSession();
    try {
        session.startTransaction(transactionOptions);

        const ordersCollection = client.db('plantbook').collection('orders');
        const orderResult = await ordersCollection.insertOne(
            {
                customer: payment.customer,
                items: cart,
                total: payment.total,
            },
            { session }
        );

        const inventoryCollection = client.db('testdb').collection('inventory');
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];

            // Cancel the transaction when you have insufficient inventory
            const checkInventory = await inventoryCollection.findOne(
                {
                    sku: item.sku,
                    qty: { $gte: item.qty }
                },
                { session }
            )
            if (checkInventory === null) {
                throw new Error('Insufficient quantity or SKU not found.');
            }

            await inventoryCollection.updateOne(
                { sku: item.sku },
                { $inc: { 'qty': -item.qty } },
                { session }
            );
        }

        const customerCollection = client.db('testdb').collection('customers');
        await customerCollection.updateOne(
            { _id: payment.customer },
            { $push: { orders: orderResult.insertedId } },
            { session }
        );
        await session.commitTransaction();
        console.log('Transaction successfully committed.');

    } catch (error) {
        if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
            // add your logic to retry or handle the error
        }
        else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
            // add your logic to retry or handle the error
        } else {
            console.log('An error occured in the transaction, performing a data rollback:' + error);
        }
        await session.abortTransaction();
    } finally {
        await session.endSession();
    }
}




// hardcode port to 3000 for now
const port = 3000;
const server = http.Server(app);

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});