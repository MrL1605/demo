import React, {Component} from "react";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {nm: false, styleInd: 0};
    }

    render() {
        const availableStyles = ["https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
            "https://bootswatch.com/4/materia/bootstrap.min.css",
            "https://bootswatch.com/4/darkly/bootstrap.min.css",
            "https://bootswatch.com/4/slate/bootstrap.min.css",
            "https://bootswatch.com/4/superhero/bootstrap.min.css"
        ];
        const availableStylesNames = ["Default", "Materia", "Darkly", "Slate", "SuperHero"];
        const darkStyles = [false, false, true, true, false];
        const toggleNightMode = () => {
            this.setState({nm: !this.state.nm}, () => {
                this.props.night(this.state.nm);
            });
        };
        const toggleStyle = (ind) => {
            this.setState({styleInd: ind});
        };
        const {styleInd, nm} = this.state;

        return (
            <div>
                {/*
                {availableStyles.map((style, ind) =>
                    <link key={ind} href={availableStyles[styleInd]}
                          rel={styleInd === ind ? "stylesheet" : "stylesheet alt"}/>
                )}
*/}
                <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top"
                    // Override as diff styles make this larger and smaller
                     style={{paddingTop: "0.1rem", paddingBottom: "0.1rem"}}>
                    <a className="navbar-brand" onClick={() => window.location.reload()}>
                        <img src="https://github.com/MrL1605/demo/raw/master/assets/clari5_logo.png"
                             style={{height: "58px"}} alt="Clari5 Logo"/>
                    </a>
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navBarThemeDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {availableStylesNames[styleInd]} Theme
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navBarThemeDropdown">
                                {availableStylesNames.map((name, ind) =>
                                    <a className="dropdown-item" href="#" key={name}
                                       onClick={() => toggleStyle(ind)}>
                                        <i className={"fas mr-1 " + (darkStyles[ind] ? "fa-moon" : "fa-sun")}/>
                                        {name}
                                    </a>
                                )}
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
