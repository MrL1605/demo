import React, {Component} from "react";
import {DB} from "../API";
// import ListIssues from "./ListIssues";
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
        const {projectList, project} = this.state;

        return (
            <div style={{marginTop: "90px"}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <h6 className="justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                Projects
                            </h6>
                            {projectList.length === 0 && (
                                <div className="spinner-border mx-5 mt-4 mb-1" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                            <div className="list-group">
                                {projectList.length !== 0 && projectList.map(p =>
                                    <a onClick={() => setProject(p)}
                                       className={"list-group-item list-group-item-action " + (p === project ? "active" : "")}>
                                        {p}
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="col-10">
                            {(project
                                && <ListIssues project={project}/>)
                            ||
                            <div className="spinner-border mx-5 mt-4 mb-1" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <HeaderComponent night={_nm => this.setState({nm: _nm})}/>
            </div>
        );
    }
}
