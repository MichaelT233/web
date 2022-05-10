import { Router } from "./core/router/router";
import React from "react";
import * as ReactDOM from 'react-dom';

// render app on window load
window.onload = (): void => {
    ReactDOM.render(<Router/>, document.getElementById('root'));
}