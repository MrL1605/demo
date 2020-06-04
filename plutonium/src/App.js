import React, {Component} from "react";
import "./styles.css";
import {
    Button,
    Divider,
    Segment,
    Sidebar,
    Header,
    Menu,
    Icon,
    Image
} from "semantic-ui-react";
import GenesisComponent from "./icms/GenesisComponent";

export default class App extends Component {
    constructor() {
        super();
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
                <h1>ICMS</h1>
                <h2>Code Name: Plutonium</h2>
                <h3>Let's see what this CSS framework has for you</h3>
                <Button onClick={this.openICMS}>Open ICMS</Button>
            </div>
        );
    }
}
