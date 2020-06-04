import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// // TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "assets/css/material-dashboard-react.css?v=1.9.0";
document.head.appendChild(styleLink);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    rootElement
);
