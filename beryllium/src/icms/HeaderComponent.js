import React, {Component} from "react";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {nm: false};
    }

    render() {
        const toggleNightMode = () => {
            this.setState({nm: !this.state.nm}, () => {
                this.props.night(this.state.nm);
            });
        };
        const {nm} = this.state;

        return (
            <nav className={"navbar is-fixed-top " + (nm ? "is-dark" : "is-link")} role="navigation"
                 aria-label="main navigation">
                <div className="navbar-brand" onClick={() => window.location.reload()}>
                    <img src="https://github.com/MrL1605/demo/raw/master/assets/clari5_logo.png"
                         style={{height: "58px"}} alt="Clari5 Logo"/>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <p className="control">
                            {(nm && (
                                <a className={"button is-black"} onClick={toggleNightMode}>
                                    <span className="icon">
                                        <i className="fas fa-moon"/>
                                    </span>
                                    <span>Dark</span>
                                </a>
                            )) || (
                                <a className={"button is-light"} onClick={toggleNightMode}>
                                    <span className="icon">
                                        <i className="fas fa-sun"/>
                                    </span>
                                    <span>Light</span>
                                </a>
                            )}
                        </p>
                    </div>
                </div>
            </nav>
        );
    }
}
