// order database adapter connection test

import { client } from "./databaseAdapter.js";

async function test() {
    console.log("start");
    console.log(client);
    try {
        await client.connect();     
    } catch (e) {
        console.error(e);
    }
    const database = client.db("order");
    const collection = database.collection("cart");
    var test = await collection.insertOne({ token: "test", items: []});
    console.log(test);
    test = await collection.findOne({ token: "test" });
    console.log(test);
    test = await collection.deleteOne({ token: "test" });
    console.log(test);
}

test();