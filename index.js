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
await connectToMongoDB()

//get api
app.get("/", (req, res) => {
  res.send("Simple CRUD operation");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
