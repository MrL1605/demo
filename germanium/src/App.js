import React, {Component} from "react";
import "./styles.css";
import {Button, Heading, majorScale} from "evergreen-ui";
import GenesisComponent from "./icms/GenesisComponent";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            showICMS: false
        };
        this.openICMS = this.openICMS.bind(this);
    }

    openICMS() {
        this.setState({showICMS: true});
    }

    render() {
        if (this.state.showICMS) {
            return <GenesisComponent/>;
        }

        return (
            <div className="App">
                <Heading size={900} marginTop={majorScale(4)}>ICMS</Heading>
                <Heading size={700} marginTop="default">Code Name: Germanium</Heading>
                <Heading size={500} marginTop="default">Let's see what this CSS framework has for you</Heading>
                <Button marginTop={majorScale(5)} height={majorScale(5)} appearance={"primary"} onClick={this.openICMS}>Open
                    ICMS</Button>
            </div>
        );
    }
}
