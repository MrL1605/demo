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
            <div data-uk-sticky="sel-target: .uk-navbar-container">
                <div className="uk-navbar-container" data-uk-navbar={true}>
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" onClick={() => window.location.reload()}>
                            <img style={{height: "58px"}}
                                 src="https://github.com/MrL1605/demo/raw/master/assets/clari5_logo.png"
                                 alt="Clari5 Logo"/>
                        </a>
                        <a className="uk-navbar-toggle" data-uk-toggle="target: #projects-off-canvas-slide">
                            <span data-uk-navbar-toggle-icon={true}/>
                            <span className="uk-margin-small-left">Projects</span>
                        </a>
                    </div>
                    <div className="uk-navbar-right">
                        <div className="uk-navbar-item">
                            <a className="uk-button" onClick={toggleNightMode}>
                                <span uk-icon="icon: star"/>
                                <span>{nm ? "Dark" : "Light"}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
