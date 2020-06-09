import React, {Component} from "react";
import "./styles.css";
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
            <div className="App align-content-center">
                <h1>ICMS</h1>
                <h2>Code Name: Oxygen</h2>
                <h3>Let's see what this CSS framework has for you</h3>
                <button onClick={this.openICMS} className="btn btn-outline-light">Open ICMS</button>
            </div>
        );
    }
}

export function classNames(classes) {
    return Object.entries(classes)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(' ');
}
