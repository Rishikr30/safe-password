const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')


dotenv.config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// CORRECT for Render
// It tries to find the cloud URL first. If not found, it falls back to localhost (for your laptop).
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

 client.connect();

//get all the passwords
app.get('/', async (req, res) => {
   
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

//save passwords
app.post('/', async (req, res) => {
    console.log("Post request running at 3000")
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success : true,result: findResult})
})

//delete passwords
// Delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    // We search by the 'id' field you created in React (uuid), not the mongodb '_id'
    const findResult = await collection.deleteOne({ id: password.id });
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})