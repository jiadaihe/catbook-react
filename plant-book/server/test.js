const uri = "mongodb+srv://hjdcathy:aplrt5d5a1qtr48o@cluster0.vhjrw.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");

// Create a new MongoClient
const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongo.connect(err => {
  const weather = mongo.db("plantbook").collection("weather");
});

async function test() {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const coll = collections.find(coll => coll.name === 'Test');
    assert.ok(coll);
    console.log(coll.type)
    assert.equal(coll.type, 'timeseries');
    
    assert.equal(coll.options.timeseries.timeField, 'timestamp');
  }
  
  test();