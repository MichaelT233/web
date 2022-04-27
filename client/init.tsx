import { Router } from "./core/router/router";
import React from "react";
import * as ReactDOM from 'react-dom';

window.onload = () => {
    ReactDOM.render(<Router/>, document.getElementById('root'));
}