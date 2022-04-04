import * as ReactDOM from "react-dom";
import { ProductUIFactory } from "./fe-factory";

const productUIFactory = new ProductUIFactory;

window.addEventListener('load', (): void => {
    console.log('here');
    (async (): Promise<void> => {
        const singleProductUI = await productUIFactory.createSingle("0019");
        ReactDOM.render(singleProductUI, document.getElementById("singleRoot"));
    })();
});