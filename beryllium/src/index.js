import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css";
document.head.appendChild(styleLink);
const fontAwesomeDep = document.createElement("link");
fontAwesomeDep.rel = "stylesheet";
fontAwesomeDep.href = "https://use.fontawesome.com/releases/v5.0.2/css/all.css";
document.head.appendChild(fontAwesomeDep);


const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    rootElement
);
