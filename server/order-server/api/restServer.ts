import express = require("express");
import { Cart } from "../business-logic/cart";

const server = express();
const cart = new Cart();

server.get("/create", (req, res) => {
    (async () => {
        const result = await cart.create(req.query.token as string, JSON.parse(req.query.entry as string));
        res.type("json");
        res.send(result);
    })();
});
server.get("/add", (req, res) => {
    (async () => {
        const result = await cart.addItem(req.query.token as string, JSON.parse(req.query.entry as string));
        res.type("json");
        res.send(result);
    })();
});
server.get("/delete", (req, res) => {
    (async () => {
        const result = await cart.deleteItem(req.query.token as string, req.query.id as string);
        res.type("json");
        res.send(result);
    })();
});
server.get("/inc", (req, res) => {
    (async () => {
        const result = await cart.incItem(req.query.token as string, req.query.id as string);
        res.type("json");
        res.send(result);
    })();
});
server.get("/dec", (req, res) => {
    (async () => {
        const result = await cart.decItem(req.query.token as string, req.query.id as string);
        res.type("json");
        res.send(result);
    })();
});
server.get("/read", (req, res) => {
    (async () => {
        const result = await cart.read(req.query.token as string);
        res.type("json");
        res.send(result);
    })();
});

server.listen(80);