const { MongoClient } = require('mongodb');

const uri = "mongodb://adapter:a9snJYSsDm8rSAHG@cart-database:27017";
export const client = new MongoClient(uri);

export interface CartModel {
    token: string;
    items: Entry[];
}
export interface Entry {
    id: string;
    quantity: number;
}