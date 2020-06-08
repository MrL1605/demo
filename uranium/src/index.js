import React from "react";
import ReactDOM from "react-dom";

import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit.min';
import '../node_modules/uikit/dist/js/uikit-icons.min';

import App from "./App";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/css/uikit.min.css";
// document.head.appendChild(styleLink);
// const scriptLink = document.createElement("script");
// scriptLink.src = "https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/js/uikit.min.js";
// document.head.appendChild(scriptLink);
// const iconsScriptLink = document.createElement("script");
// iconsScriptLink.src = "https://cdn.jsdelivr.net/npm/uikit@3.5.3/dist/js/uikit-icons.min.js";
// document.head.appendChild(iconsScriptLink);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    rootElement
);
