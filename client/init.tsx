import { Test } from "./product-client/ui/component";
import React from "react";
import * as ReactDOM from 'react-dom';

window.onload = () => {
    ReactDOM.render(<Test/>, document.getElementById('root'));
}