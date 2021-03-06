import React from "react";
import ReactDOM from "react-dom";

import {App} from "./App";
import {ThemeProvider} from "@chakra-ui/core";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    rootElement
);
