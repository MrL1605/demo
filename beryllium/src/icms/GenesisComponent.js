import React, {Component} from "react";
import {DB} from "../API";
// import ListIssues from "./ListIssues";
import HeaderComponent from "./HeaderComponent";
import ListIssues from "./ListIssues";

export default class GenesisComponent extends Component {
    constructor() {
        super();
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
        const darkClasses = nm ? " has-background-grey has-text-light" : "";

        return (
            <div className={"has-navbar-fixed-top"} style={{marginTop: "70px"}}>
                <div className={"container is-fluid" + darkClasses}>
                    <div className="columns">
                        <div className="column is-one-fifth">
                            <aside className="menu">
                                <p className={"menu-label " + (nm ? "has-text-white" : "")}>
                                    Projects
                                </p>
                                <ul className="menu-list">
                                    {projectList.length && (
                                        projectList.map(p =>
                                            <li onClick={() => setProject(p)}>
                                                <a className={darkClasses + (p === project ? " is-active" : "")}>
                                                    {p}
                                                </a>
                                            </li>
                                        )
                                    ) || <div className="has-text-grey-light"> Loading... </div>}
                                </ul>
                            </aside>
                        </div>
                        <div className="column">
                            {(project
                                && <ListIssues project={project} nm={nm}/>)
                            || <div className="has-text-grey-light"> Loading... </div>}
                        </div>
                    </div>
                </div>
                <HeaderComponent night={_nm => this.setState({nm: _nm})}/>
            </div>
        );
    }
}
