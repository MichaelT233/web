// class implementing basic functions of a product catalog
// queries return null if the query fails

// product data object
export type Product = {
    id: string;
    stock: number;
    category: string;
    title: string;
    price: number;
    featured: boolean;
    image_path: string;
}

import { DB } from '../database/databaseAdapter.js'

export class Catalog {
    // property holding database adapter object
    db: typeof DB;
     // declare database adapter
    constructor() {
        this.db = DB;
    }
    // get single product by id 
    async getProduct(id: string): Promise<Product[]> {
        try {
            const res = await this.db.query(`SELECT * FROM products WHERE id = '${id}';`);
            const result: Product[] = res.rows;
            return result;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    // get many products by ids
    async getMany(idList: string): Promise<Product[]> {
        try {
            const list = "(" + idList + ")";
            const res = await this.db.query(`SELECT * FROM products WHERE id IN ${list};`);
            const result: Product[] = res.rows;
            return result;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    // get products by category
    async getCategory(category: string): Promise<Product[]> {
        try {
            const res = await this.db.query(`SELECT * FROM products WHERE category = '${category}';`);
            const result: Product[] = res.rows;
            return result;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    // get featured products
    async getFeatured(): Promise<Product[]> {
        try {
            const res = await this.db.query(`SELECT * FROM products WHERE featured = TRUE;`);
            const result: Product[] = res.rows;
            return result;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    // get products by title containing a text pattern
    async getSearch(text: string): Promise<Product[]> {
        try {
            const res = await this.db.query(`SELECT * FROM products WHERE title ILIKE '%${text}%';`);
            const result: Product[] = res.rows;
            return result;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
}