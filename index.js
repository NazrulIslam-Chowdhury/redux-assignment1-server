const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

// database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hnlrj23.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const contentCollection = client.db('reduxAssignment1').collection('content');

        app.get('/content', async (req, res) => {
            const content = {};
            const result = await contentCollection.find(content).toArray();
            res.send(result);
        })
    }
    finally {

    }
}

run().catch((error) => console.log(error));



app.get('/', (req, res) => {
    res.send('Redux assignment server is running')
})

app.listen(port, () => {
    console.log(`Redux server is running on port: ${port}`)
})
