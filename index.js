const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const ObjectId = require('mongodb').ObjectId;

// use middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// user
// Pet-Paleo
// wya5ioZ4gWdSn0g7
// const uri = "mongodb+srv://process.env.USER:process.env.PASSWORD@cluster0.unqmenx.mongodb.net/?retryWrites=true&w=majority";

const uri =
  "mongodb+srv://Pet-Paleo:wya5ioZ4gWdSn0g7@cluster0.unqmenx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const foodsCollection = client.db("PetDB").collection("Pet-Foods");

    // add a food
    app.post("/addFood", async (req, res) => {
      const newFood = req.body;
      console.log("add a new food", newFood);
      const result = await foodsCollection.insertOne(newFood);
      res.send(result);
    });
    // get all foods
    app.get("/allFood", async (req, res) => {
      const query = {};
      const cursor = foodsCollection.find(query);
      const food = await cursor.toArray();
      res.send(food);
    });
    // get a specific food 
    app.get('/allFood/:id', async (req, res) =>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result = await foodsCollection.findOne(query);
      res.send(result)
    })
    //update a food item
    app.put('/allFood/:id', async (req, res) =>{
      const id = req.params.id;
      const updateFood = req.body;
      const filter ={_id:ObjectId(id)}
      const options = {upsert:true}
      const updateDoc = {
        $set: {
          name: updateFood.name,
          type: updateFood.type,
          weight: updateFood.weight,
          img: updateFood.img,
          price: updateFood.price,
          description: updateFood.description

        }
      }
      const result = await foodsCollection.updateOne(filter, updateDoc, options)
      res.send(result)
      
    })
    //delete a food item
    app.delete("/allFood/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result = await foodsCollection.deleteOne(query)
      res.send(result)
    })
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running My Pet Server");
});

app.listen(port, () => {
  console.log("Pets Server is running");
});
