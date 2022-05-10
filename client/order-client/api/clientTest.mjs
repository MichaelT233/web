// block for testing order service rest api client

import { RestClient } from "./restClient.js"

const client = new RestClient();

export async function testOrderClient() {
    console.log(await client.create("test"));
    console.log(await client.read("test"));
    console.log(await client.addItem("test", "0000", 2));
    console.log(await client.read("test"));
    console.log(await client.addItem("test", "0019", 6));
    console.log(await client.read("test"));
    console.log(await client.getProductData("test"));
    console.log(await client.read("test"));
    console.log(await client.inc("test", "0000"));
    console.log(await client.read("test"));
    console.log(await client.dec("test", "0000"));
    console.log(await client.read("test"));
    console.log(await client.deleteItem("test", "0000"));
    console.log(await client.read("test"));
    console.log(await client.delete("test"));
}