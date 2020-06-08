import React from "react";
import ReactDOM from "react-dom";


import App from "./App";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
for (let scriptUrl of ["https://code.jquery.com/jquery-3.5.1.slim.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"]) {
    const scriptEle = document.createElement("script");
    scriptEle.src = scriptUrl;
    document.head.appendChild(scriptEle);
}
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
