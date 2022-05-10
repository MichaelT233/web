import { Pool } from "pg";

// object that allows use of a connection to the postgresql (product) database
const pool = new Pool({
    user: "adapter",
    host: "product-database",
    database: "products",
    password: "7sfEkfYS5WyNNE2P",
    port: 5432,
});

export const DB = pool;