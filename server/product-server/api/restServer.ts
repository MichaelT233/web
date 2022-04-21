import express = require("express");
import { Catalog } from "../business-logic/catalog";

const server = express();
const catalog = new Catalog();

server.get("/item", (req, res) => {
    (async () => {
        const result = await catalog.provideProduct(req.query.id as string);
        res.type("json");
        res.send(result);
    })();
});
server.get("/category", (req, res) => {
    (async () => {
        const result = await catalog.provideCategory(req.query.category as string);
        res.type("json");
        res.send(result);
    })();
});
server.get("/featured", (req, res) => {
    (async () => {
        const result = await catalog.provideFeatured();
        res.type("json");
        res.send(result);
    })();
});
server.get("/search", (req, res) => {
    (async () => {
        const result = await catalog.provideSearch(req.query.text as string);
        res.type("json");
        res.send(result);
    })();
});

server.listen(80);