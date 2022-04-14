import { Pool } from "pg";

const pool = new Pool({
    user: "adapter",
    host: "product-database",
    database: "products",
    password: "7sfEkfYS5WyNNE2P",
    port: 5432,
});

export class databaseAdapter {
    async getProduct(id: string): Promise<any[]> {
        const res = await pool.query(`SELECT * FROM products WHERE id = '${id}';`);
        const result = res.rows;
        return result;
    }
    async getCategory(category: string): Promise<any[]> {
        const res = await pool.query(`SELECT * FROM products WHERE category = '${category}';`);
        const result = res.rows;
        return result;
    }
    async getFeatured(): Promise<any[]> {
        const res = await pool.query(`SELECT * FROM products WHERE featured = TRUE;`);
        const result = res.rows;
        return result;
    }
    async getSearch(text: string): Promise<any[]> {
        const res = await pool.query(`SELECT * FROM products WHERE title ILIKE '%${text}%';`);
        const result = res.rows;
        return result;
    }
}