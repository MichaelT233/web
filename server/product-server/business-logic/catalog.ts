import { DB } from '../database/databaseAdapter.js'

export class Catalog {
    db: typeof DB;
    constructor() {
        this.db = DB;
    }
    async getProduct(id: string): Promise<any[]> {
        const res = await this.db.query(`SELECT * FROM products WHERE id = '${id}';`);
        const result = res.rows;
        return result;
    }
    async getMany(idList: string): Promise<any[]> {
        const list = "(" + idList + ")";
        console.log(list);
        const res = await this.db.query(`SELECT * FROM products WHERE id IN ${list};`);
        const result = res.rows;
        return result;
    }
    async getCategory(category: string): Promise<any[]> {
        const res = await this.db.query(`SELECT * FROM products WHERE category = '${category}';`);
        const result = res.rows;
        return result;
    }
    async getFeatured(): Promise<any[]> {
        const res = await this.db.query(`SELECT * FROM products WHERE featured = TRUE;`);
        const result = res.rows;
        return result;
    }
    async getSearch(text: string): Promise<any[]> {
        const res = await this.db.query(`SELECT * FROM products WHERE title ILIKE '%${text}%';`);
        const result = res.rows;
        return result;
    }
}