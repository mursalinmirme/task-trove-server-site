const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4400;

// middleware
app.use(cors());
app.use(express.json());
// mongo db connect start

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@mursalin.bxh3q56.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db('wordsList');
    const wordsCollection = database.collection('words-collection');

    app.get('/', (req, res) => {
        res.send("I am the root route. My sub route has more data....");
    })

    // add a new word
    app.post('/words-list', async(req, res) => {
       const newWord = req.body;
       const saveNewWordResult = await wordsCollection.insertOne(newWord);
       res.send(saveNewWordResult);
       console.log(newWord);
       console.log("someone hittting to adding new words");
    })



    // get requsestes
    app.get('/words-list', async(req, res) => {
        try{
          const result = await wordsCollection.find().toArray();
          res.send(result);
        }catch(err){
          console.log(err);
        }
    })



    // Send a ping to confirm a successful connection
    /*await*/ client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongo bd connect end

app.listen(port, () => {
    console.log(`The current port no: ${port} is running.`);
})







