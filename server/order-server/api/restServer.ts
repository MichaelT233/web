// rest api server for the order service

import express = require("express");
var cookieParser = require('cookie-parser');
import { Cart } from "../business-logic/cart";

const server = express();
server.use(cookieParser());
const cart = new Cart();

// initialize order database and cart collection
(async () => {
    const init = await cart.init();
    if (init == true) {
        console.log("database initialized");
    }
    else {
        console.log("database error");
    }
})();

// routes for the different shopping cart operations
server.post("/create", (req, res) => {
    (async () => {
        const result = await cart.create(req.cookies.token);
        res.type("json");
        res.send({ result: result });
    })();
});
server.delete("/delete", (req, res) => {
    (async () => {
        const result = await cart.delete(req.cookies.token);
        res.type("json");
        res.send({ result: result });
    })();
});
server.put("/additem/:id/:quantity", (req, res) => {
    (async () => {
        res.type("json");
        // if no cookies present
        if (Object.keys(req.cookies).length == 0) {
            const token = JSON.stringify(Math.random()).slice(2,19);
            res.cookie("token", token);
            const create = await cart.create(token);
            if (create == true) {
                console.log("new cart initialized, token: " + token);
            }
            else {
                res.send(false);
            }
            const result = await cart.addItem(token, req.params.id, parseInt(req.params.quantity));
            res.send({ result: result });
        }
        // if cookies are present
        else {
            const result = await cart.addItem(req.cookies.token, req.params.id, parseInt(req.params.quantity));
            res.send({ result: result });
        }
    })();
});
server.put("/deleteitem/:id", (req, res) => {
    (async () => {
        const result = await cart.deleteItem(req.cookies.token, req.params.id);
        res.type("json");
        res.send({ result: result });  
    })();
});
server.put("/inc/:id", (req, res) => {
    (async () => {
        const result = await cart.incItem(req.cookies.token, req.params.id);
        res.type("json");
        res.send({ result: result });    
    })();
});
server.put("/dec/:id", (req, res) => {
    (async () => {
        const result = await cart.decItem(req.cookies.token, req.params.id);
        res.type("json");
        res.send({ result: result });    
    })();
});
server.get("/read", (req, res) => {
    (async () => {
        const result = await cart.read(req.cookies.token);
        res.type("json");
        res.send({ result: result }); 
    })();
});

// set server to listen on port 80
server.listen(80);