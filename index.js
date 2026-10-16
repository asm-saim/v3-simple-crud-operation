import express from "express";
import cors from "cors"

const app = express();
const port = process.env.port || 5000;

//middleware:
app.use(cors()); 
app.use(express.json());

// uri string:
mongodb://<db_username>:<db_password>@ac-ncwdfwf-shard-00-00.40qepqq.mongodb.net:27017,ac-ncwdfwf-shard-00-01.40qepqq.mongodb.net:27017,ac-ncwdfwf-shard-00-02.40qepqq.mongodb.net:27017/?ssl=true&replicaSet=atlas-5dujy9-shard-0&authSource=admin



//get api
app.get("/", (req, res) => {
  res.send("Simple CRUD operation");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
