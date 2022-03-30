import { Pool } from 'pg';

const pool = new Pool({
    user: 'testu',
    host: 'product-db',
    database: 'testdb',
    password: 'testpw',
    port: 5432,
});
export type Query = {
    field: string
    value: string    
};
class Adaptee {
    async getAll(): Promise<any[]> {
        const res = await pool.query("SELECT * FROM products;")
        const result = res.rows
        return result
    };
    async getRows(query: Query): Promise<any[]> {
        const res = await pool.query(`SELECT * FROM products WHERE ${query.field}='${query.value}';`)
        const result = res.rows
        return result
    };
    //getPrice
};
interface Target {
    readDB(): Promise<any[]>
    readRows(query: Query): Promise<any[]>
};
export class Adapter implements Target {
    adaptee = new Adaptee()
    async readDB(): Promise<any[]> {
        const result = await this.adaptee.getAll()
        return result    
    };
    async readRows(query: Query): Promise<any> {
        const result = await this.adaptee.getRows(query)
        return result
    };
};