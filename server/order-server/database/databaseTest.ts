import { client } from "./databaseAdapter";

async function test(): Promise<typeof client> {
    await client.connect();
    const database = client.db("order");
    const collection = database.collection("cart");
    var test = await collection.insert({ token: "test", items: []});
    console.log(test);
    test = await collection.deleteOne({ token: "test" });
    console.log(test);
}

test();