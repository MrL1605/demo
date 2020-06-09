import React from "react";
import ReactDOM from "react-dom";


import App from "./App";

for (let stylesUrl of ["css/bootstrap.min.css",
    "css/mdb.min.css",
    "css/style.css"]) {
    const scriptEle = document.createElement("link");
    scriptEle.href = stylesUrl;
    scriptEle.rel = "stylesheet";
    document.head.appendChild(scriptEle);
}
for (let scriptUrl of ["js/jquery.min.js",
    "js/popper.min.js",
    "js/bootstrap.min.js",
    "js/mdb.min.js"]) {
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
