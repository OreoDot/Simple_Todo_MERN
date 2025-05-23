require("dotenv").config();
const {MongoClient, ServerApiVersion } = require("mongodb");

const url = process.env.MONGO_URI || "mongodb://localhost:27017";

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;
const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(url, options);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.log("Error connecting to MongoDB", error);
        }
    }
    return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };
