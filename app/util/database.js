import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/"
let connectDB;
if (!global.mongo) {
    global.mongo = new MongoClient(url).connect();
}
connectDB = global.mongo

export { connectDB };