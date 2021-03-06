// rest api server for the product service

import express = require("express");
import { Catalog } from "../business-logic/catalog.js";

const server = express();
const catalog = new Catalog();

// routes for the different product catalog operations
server.get("/item/:id", (req, res) => {
    (async () => {
        const result = await catalog.getProduct(req.params.id);
        res.type("json");
        res.send({ result: result });
    })();
});
server.get("/many/:idList", (req,res) => {
    (async () => {
        const result = await catalog.getMany(req.params.idList);
        res.type("json");
        res.send({ result: result });
    })();
});
server.get("/category/:name", (req, res) => {
    (async () => {
        const result = await catalog.getCategory(req.params.name);
        res.type("json");
        res.send({ result: result });
    })();
});
server.get("/featured", (req, res) => {
    (async () => {
        const result = await catalog.getFeatured();
        res.type("json");
        res.send({ result: result });
    })();
});
server.get("/search/:text", (req, res) => {
    (async () => {
        const result = await catalog.getSearch(req.params.text);
        res.type("json");
        res.send({result: result});
    })();
});

// set server to listen on port 80
server.listen(80);