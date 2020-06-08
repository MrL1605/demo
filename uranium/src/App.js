import React, {Component} from "react";
import "./styles.css";
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
                <h1 className="uk-heading-medium">ICMS</h1>
                <h2 className="uk-heading-small">Code Name: Uranium</h2>
                <h3>Let's see what this CSS framework has for you</h3>
                <button className="uk-button" onClick={this.openICMS}>Open ICMS</button>
            </div>
        );
    }
}
