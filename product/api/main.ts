import express = require('express');
import { Adapter, Query } from './db-adapter';
const app = express();
const adapter = new Adapter();

app.get('/', (req, res) => {
    (async () => {
        const result = await adapter.readDB()
        res.type('json')
        res.send(result)
    })();
});
app.get('/search', (req, res) => {
    const query: Query = {
        field: req.query.q as string,
        value: req.query.v as string
    };
    (async () => {
        const result = await adapter.readRows(query)
        res.type('json')
        res.send(result)
    })();
});
app.listen(80, '0.0.0.0');
console.log(`listening on 80`);