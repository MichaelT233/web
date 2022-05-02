import { client, Entry } from "../database/databaseAdapter";

export class Cart {
    db: typeof client.db;
    coll: typeof client.db.collection;
    async init(): Promise<boolean> {
        try {
            await client.connect();
            const database = client.db("order");
            this.db = database;
            const collection = database.collection("cart");
            this.coll = collection;
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async resetDB() {
        try {
            await this.db.dropDatabase();
        }
        catch(e) {
            console.error(e)
            return false;
        }
        return true;
    }
    async resetColl() {
        try {
            await this.coll.drop();
        }
        catch(e) {
            console.error(e)
            return false;
        }
        return true;
    }
    async end() {
        try {
            await client.close();

        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async create(token: string) {
        try {
            if (await this.isInColl(token) == false) {
                await this.coll.insertOne({ token: token, items: []});
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async delete(token: string) {
        try {
            if (await this.isInColl(token) == true) {
                await this.coll.deleteOne({ token: token });
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async addItem(token: string, id: string, quantity: number) {
        try {
            if (await this.isInCart(token, id) == false) {
                await this.coll.updateOne({ token: token }, { $push: { items: {id: id, quantity: quantity}} });
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async deleteItem(token: string, id: string) {
        try {
            if (await this.isInCart(token, id) == true) {
                await this.coll.updateOne({ token: token }, { $pull: { items: { id: id } } });
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async incItem(token: string, id: string) {
        try {
            if (await this.isInCart(token, id) == true) {
                const quantity = await this.getQuantity(token, id);
                const next = quantity + 1;
                await this.coll.updateOne({ token: token, "items.id": id }, { $set: { "items.$.quantity": next } });
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async decItem(token: string, id: string) {
        try {
            if (await this.isInCart(token, id) == true) {
                const quantity = await this.getQuantity(token, id);
                const next = quantity - 1;
                await this.coll.updateOne({ token: token, "items.id": id }, { $set: { "items.$.quantity": next } });
            }
            else {
                return false;
            }
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async read(token: string) {
        const current = await this.coll.findOne({ token: token });
        return current;
    }
    private async isInCart(token: string, id: string) {
        const current = await this.coll.findOne({ token: token });
        for (const entry of current.items) {
            if (entry.id == id) {
                return true;
            }
        }
        return false;
    }
    private async isInColl(token: string) {
        const current = await this.coll.findOne({ token: token });
        if (current != null) {
            if (current.token == token) {
                return true;
            }
        }
        return false;
    }
    private async getQuantity(token: string, id: string) {
        const current = await this.coll.findOne({ token: token });
        for (const entry of current.items) {
            if (entry.id == id) {
                return entry.quantity;
            }
        }
    }
}