import { client, Entry } from "../database/databaseAdapter";

async function useDB(): Promise<typeof client> {
    await client.connect();
    const database = client.db("order");
    const collection = database.collection("cart");
    return collection;
}

export class Cart {
    db: typeof client;
    async init(token: string): Promise<void> {
        this.db = await useDB();
    }
    async create(token: string, entry: Entry) {
        await this.db.insert({ token: token, items: [entry]});
    }
    async addItem(token: string, entry: Entry) {
        const current = await this.db.findOne({ token: token });
        if (this.isInCart(entry.id, current.items) == false) {
            await this.db.updateOne({ token: token }, { $push: { items: entry} });
        }
    }
    async deleteItem(token: string, id: string) {
        await this.db.updateOne({ token: token }, { $pull: { items: { "entry.id": id } } });
    }
    async incItem(token: string, id: string) {
        const current = await this.db.findOne({ token: token });
        const next = this.getQuantity(id, current.items) + 1;
        await this.db.updateOne({ token: token }, { $set: { "items.$.quantity": next } });
    }
    async decItem(token: string, id: string) {
        const current = await this.db.findOne({ token: token });
        const next = this.getQuantity(id, current.items) - 1;
        await this.db.updateOne({ token: token }, { $set: { "items.$.quantity": next } });
    }
    async read(token: string) {
        const current = await this.db.findOne({ token: token });
        return current;
    }
    private isInCart(id: string, items: Entry[]) {
        for (const entry of items) {
            if (entry.id == id) {
                return true;
            }
        }
        return false;
    }
    private getQuantity(id: string, items: Entry[]) {
        for (const entry of items) {
            if (entry.id == id) {
                return entry.quantity;
            }
        }
    }
}