// class implementing the functionality of a shopping cart
// commands return true/false based on the success/failure of the command
// queries return null if the query fails

import { client } from "../database/databaseAdapter";

// cart entry object
export type Entry = {
    id: string;
    quantity: number;
}

export class Cart {
    // database adapter object
    db: typeof client.db;
    // database collection
    coll: typeof client.db.collection;
    // initialize the order database and cart collection
    async init(): Promise<boolean> {
        try {
            await client.connect();
            const database = client.db("order");
            this.db = database;
            const collection = database.collection("cart");
            this.coll = collection;
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // drops the order database
    async resetDB(): Promise<boolean> {
        try {
            await this.db.dropDatabase();
            return true;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
    // drops the cart collection
    async resetColl(): Promise<boolean> {
        try {
            await this.coll.drop();
            return true;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
    // closes database connection
    async end(): Promise<boolean> {
        try {
            await client.close();
            return true;

        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // create a new cart document by token
    async create(token: string): Promise<boolean> {
        try {
            if (await this.isInColl(token) == false) {
                const items: Entry[] = [];
                await this.coll.insertOne({ token: token, items: items});
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // delete a cart document by token
    async delete(token: string): Promise<boolean> {
        try {
            if (await this.isInColl(token) == true) {
                await this.coll.deleteOne({ token: token });
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // add an item to a cart by id
    async addItem(token: string, id: string, quantity: number): Promise<boolean> {
        try {
            if (await this.isInCart(token, id) == false) {
                const entry: Entry = {id: id, quantity: quantity};
                await this.coll.updateOne({ token: token }, { $push: { items: entry} });
            }
            else {
                const current = await this.getQuantity(token, id);
                if (current != null) {
                    const next: number = current + quantity;
                    await this.coll.updateOne({ token: token, "items.id": id }, { $set: { "items.$.quantity": next } });
                }
                else {
                    return false;
                }
            }
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // delete an item from a cart by id
    async deleteItem(token: string, id: string): Promise<boolean> {
        try {
            if (await this.isInCart(token, id) == true) {
                await this.coll.updateOne({ token: token }, { $pull: { items: { id: id } } });
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // increment an item's quantity within a cart
    async incItem(token: string, id: string): Promise<boolean> {
        try {
            if (await this.isInCart(token, id) == true) {
                const quantity = await this.getQuantity(token, id);
                const next: number = quantity + 1;
                await this.coll.updateOne({ token: token, "items.id": id }, { $set: { "items.$.quantity": next } });
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // decrement an item's quantity within a cart
    async decItem(token: string, id: string): Promise<boolean> {
        try {
            if (await this.isInCart(token, id) == true) {
                const quantity = await this.getQuantity(token, id);
                const next: number = quantity - 1;
                await this.coll.updateOne({ token: token, "items.id": id }, { $set: { "items.$.quantity": next } });
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // read a cart's entries
    async read(token: string): Promise<Entry[]> {
        try {
            const current = await this.coll.findOne({ token: token });
            if (current.items.length > 0) {
                return current;
            }
            else {
                return null;
            }
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    // check if an item is an a cart by id
    private async isInCart(token: string, id: string): Promise<boolean> {
        try {
            const current = await this.coll.findOne({ token: token });
            for (const entry of current.items) {
                if (entry.id == id) {
                    return true;
                }
            }
            return false;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // check if a cart is in the cart collection by token
    private async isInColl(token: string): Promise<boolean> {
        try {
            const current = await this.coll.findOne({ token: token });
            if (current.token == token) {
                return true;
            }
            return false;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    // get the quantity of an item from a cart by id
    private async getQuantity(token: string, id: string): Promise<number> {
        try {
            const current = await this.coll.findOne({ token: token });
            for (const entry of current.items) {
                if (entry.id == id) {
                    return entry.quantity;
                }
            }
            return null;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
}