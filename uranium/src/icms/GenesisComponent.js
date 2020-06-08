import React, {Component} from "react";
import {DB} from "../API";
import HeaderComponent from "./HeaderComponent";
import ListIssues from "./ListIssues";

export default class GenesisComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: "",
            projectList: [],
            nm: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            let projects = DB.projects;
            if (projects)
                this.setState({projectList: projects, project: projects[0]});
        }, 1000);
    }

    render() {
        const setProject = p => {
            if (p) this.setState({project: p, visible: false});
            else this.setState({visible: false});
        };
        const {nm, projectList, project} = this.state;
        const darkClasses = "";

        return (
            <div>
                <HeaderComponent night={_nm => this.setState({nm: _nm})}/>
                <div id="projects-off-canvas-slide" data-uk-offcanvas={true}>
                    <div className="uk-offcanvas-bar">
                        <ul className="uk-nav uk-nav-default">
                            <li className="uk-nav-header">Projects</li>
                            {projectList.length && (
                                projectList.map(p =>
                                    <li key={p} onClick={() => setProject(p)}>
                                        <a className={darkClasses + (p === project ? " uk-active" : "")}>
                                            {p}
                                        </a>
                                    </li>
                                )
                            ) || <li> Loading... </li>}
                        </ul>
                    </div>
                </div>
                <div className="">
                    {(project
                        && <ListIssues project={project} nm={nm}/>)
                    || <div className=""> Loading... </div>}
                </div>
            </div>
        );
    }
}
