import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    rootElement
);
