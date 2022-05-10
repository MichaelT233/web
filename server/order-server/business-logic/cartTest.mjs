// cart operations test

import { Cart } from "./cart.js"

function test(key, testOutput){
    if (testOutput == true) {
        console.log(key + ": pass");
    }
    else {
        console.log(key + ": fail");
    }
}

const cart = new Cart();

const entry = {id: "0000", quantity: 2};

(async () => {
    console.log("start");

    const init = await cart.init();
    test("init", init);

    const create = await cart.create("test");
    test("create", create);

    var add = await cart.addItem("test", "0000", 2);
    test("add", add)

    add = await cart.addItem("test", "0000", 2);
    test("addAgain", add)

    var read = await cart.read("test");
    console.log(read);

    const inc = await cart.incItem("test", "0000");
    test("inc", inc);

    read = await cart.read("test");
    console.log(read);

    const dec = await cart.decItem("test", "0000");
    test("dec", dec);

    read = await cart.read("test");
    console.log(read);

    var delItem = await cart.deleteItem("test", "0000");
    test("delItem", delItem);

    var delItem = await cart.deleteItem("test", "0000");
    test("delItemAgain", delItem);

    read = await cart.read("test");
    console.log(read);

    const del = await cart.delete("test");
    test("del", del);

    const resetColl = await cart.resetColl();
    test("resetColl", resetColl);

    const resetDB = await cart.resetDB();
    test("resetDB", resetDB);

    const end = await cart.end();
    test("end", end);
})();