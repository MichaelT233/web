import express = require("express");
var cookieParser = require('cookie-parser');
import { Cart } from "../business-logic/cart";

const server = express();
server.use(cookieParser());
const cart = new Cart();

(async () => {
    const init = await cart.init();
    if (init == true) {
        console.log("database initialized");
    }
    else {
        console.log("database error");
    }
})();

server.post("/create", (req, res) => {
    (async () => {
        const result = await cart.create(req.cookies.token);
        res.type("json");
        if (result == true) {
            res.send({result: "success"});
        }
        else {
            res.send({error: "server error"})
        }
    })();
});
server.delete("/delete", (req, res) => {
    (async () => {
        const result = await cart.delete(req.cookies.token);
        res.type("json");
        if (result == true) {
            res.send({result: "success"});
        }
        else {
            res.send({error: "server error"})
        }
    })();
});
server.put("/additem/:id/:quantity", (req, res) => {
    (async () => {
        var result: boolean;
        // if no cookies present
        if (Object.keys(req.cookies).length == 0) {
            const token = JSON.stringify(Math.random()).slice(2,19);
            res.cookie("token", token);
            const create = await cart.create(token);
            if (create == true) {
                console.log("new cart initialized, token: " + token);
            }
            else {
                res.send({error: "server error"});
            }
            result = await cart.addItem(token, req.params.id, parseInt(req.params.quantity));
        }
        // if cookies are present
        else {
            result = await cart.addItem(req.cookies.token, req.params.id, parseInt(req.params.quantity));
        }
        // send result
        res.type("json");
        if (result == true) {
            res.send({result: "success"});
        }
        else {
            res.send({error: "server error"});
        }
    })();
});
server.put("/deleteitem/:id", (req, res) => {
    (async () => {
        const result = await cart.deleteItem(req.cookies.token, req.params.id);
        res.type("json");
        if (result == true) {
            res.send({result: "success"});
        }
        else {
            res.send({error: "server error"})
        }    
    })();
});
server.put("/inc/:id", (req, res) => {
    (async () => {
        const result = await cart.incItem(req.cookies.token, req.params.id);
        res.type("json");
        if (result == true) {
            res.send({result: "success"});
        }
        else {
            res.send({error: "server error"})
        }    
    })();
});
server.put("/dec/:id", (req, res) => {
    (async () => {
        const result = await cart.decItem(req.cookies.token, req.params.id);
        res.type("json");
        if (result == true) {
            res.send({result: "success"});
        }
        else {
            res.send({error: "server error"})
        }    
    })();
});
server.get("/read", (req, res) => {
    (async () => {
        const result = await cart.read(req.cookies.token);
        res.type("json");
        if (result == false) {
            res.send({message: "empty"});
        }
        else {
            res.send(result);
        } 
    })();
});

server.listen(80);