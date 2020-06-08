import React, {useState} from "react";
import "./styles.css";
import {Button, Heading} from "@chakra-ui/core";
import GenesisComponent from "./icms/GenesisComponent";

export function App() {
    const [showICMS, setShowICMS] = useState(false);

    if (showICMS)
        return <GenesisComponent/>;

    return (
        <div className="App">
            <Heading as="h1">ICMS</Heading>
            <Heading as="h2">Code Name: Plutonium</Heading>
            <Heading as="h3">Let's see what this CSS framework has for you</Heading>
            <Button variantColor={"green"} variant={"outline"} onClick={() => setShowICMS(true)}>Open ICMS</Button>
        </div>
    );
}
