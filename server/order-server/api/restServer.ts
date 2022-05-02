import express = require("express");
import { Cart } from "../business-logic/cart";

const server = express();
const cart = new Cart();

(async () => {
    const init = await cart.init();
    if (init == true) {
        console.log("database initialized")
    }
    else {
        console.log("database error")
    }
})();

server.post("/create/:token", (req, res) => {
    (async () => {
        const result = await cart.create(req.params.token);
        res.type("json");
        if (result == true) {
            res.status(200).send({result: "success"});
        }
        else {
            res.status(500).send({error: "server error"})
        }
    })();
});
server.delete("/delete/:token", (req, res) => {
    (async () => {
        const result = await cart.delete(req.params.token);
        res.type("json");
        if (result == true) {
            res.status(200).send({result: "success"});
        }
        else {
            res.status(500).send({error: "server error"})
        }
    })();
});
server.put("/additem/:token/:id/:quantity", (req, res) => {
    (async () => {
        const result = await cart.addItem(req.params.token, req.params.id, parseInt(req.params.quantity));
        res.type("json");
        if (result == true) {
            res.status(200).send({result: "success"});
        }
        else {
            res.status(500).send({error: "server error"})
        }    
    })();
});
server.put("/deleteitem/:token/:id", (req, res) => {
    (async () => {
        const result = await cart.deleteItem(req.params.token, req.params.id);
        res.type("json");
        if (result == true) {
            res.status(200).send({result: "success"});
        }
        else {
            res.status(500).send({error: "server error"})
        }    
    })();
});
server.put("/inc/:token/:id", (req, res) => {
    (async () => {
        const result = await cart.incItem(req.params.token, req.params.id);
        res.type("json");
        if (result == true) {
            res.status(200).send({result: "success"});
        }
        else {
            res.status(500).send({error: "server error"})
        }    
    })();
});
server.put("/dec/:token/:id", (req, res) => {
    (async () => {
        const result = await cart.decItem(req.params.token, req.params.id);
        res.type("json");
        if (result == true) {
            res.status(200).send({result: "success"});
        }
        else {
            res.status(500).send({error: "server error"})
        }    
    })();
});
server.get("/read/:token", (req, res) => {
    (async () => {
        const result = await cart.read(req.params.token);
        res.type("json");
        res.send(result); 
    })();
});

server.listen(80);