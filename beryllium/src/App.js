import React, {Component} from "react";
import "./styles.css";

// import GenesisComponent from "./icms/GenesisComponent";

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
        // if (this.state.showICMS) {
        // return <GenesisComponent/>;
        // }

        return (
            <div className="App">
                <h1 className="title is-1">ICMS</h1>
                <h2 className="title is-2">Code Name: Beryllium</h2>
                <h3 className="title is-3">Let's see what this CSS framework has for you</h3>
                <button onClick={this.openICMS} className="button is-outlined">Open ICMS</button>
                <p> Fun fact: <strong>Beryllium</strong> is named after a town Belur in Karnataka </p>
            </div>
        );
    }
}
