import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 5000;

//middleware:
app.use(cors());
app.use(express.json());

// uri string:
const client = new MongoClient(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-ncwdfwf-shard-00-00.40qepqq.mongodb.net:27017,ac-ncwdfwf-shard-00-01.40qepqq.mongodb.net:27017,ac-ncwdfwf-shard-00-02.40qepqq.mongodb.net:27017/?ssl=true&replicaSet=atlas-5dujy9-shard-0&authSource=admin`,
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectedClient = await connectToMongoDB();
// Get the database and collection on which to run the operation
const db = connectedClient.db("v3-crud-operation");
const users = db.collection("users");

//get api
app.get("/", (req, res) => {
  res.send("Simple CRUD operation");
});

app.get("/users", async (req, res) => {
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers);
});

//post api:
app.post("/users", async (req, res) => {
  const newUser = req.body;

  const result = await users.insertOne(newUser);
  res.send(result);

  console.log("adding new user", newUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
