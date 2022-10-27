const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");

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
app.get("/allFood", async (req, res)=>{
  const query = {}
  const cursor = foodsCollection.find(query)
  const food = await cursor.toArray();
  res.send(food)
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
