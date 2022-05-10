const { MongoClient } = require('mongodb');

// object allowing use of a connection to the mongo order database
const uri = "mongodb://adapter:a9snJYSsDm8rSAHG@order-database:27017";
export const client = new MongoClient(uri);