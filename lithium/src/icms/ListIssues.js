import React, {Component} from "react";
import {DB} from "../API";
import {classNames} from "../App";
import DetailsComponent from "./DetailsComponent";
// import DetailsComponent from "./DetailsComponent";

export default class ListIssues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            all_issues: [],
            asc_sort_order: true,
            pageSize: 20,
            selectedIssue: "",
            lastVisitedIssue: ""
        };
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.selectIssue = this.selectIssue.bind(this);
    }

    componentDidMount() {
        this.updateIssuesList();
    }

    componentWillReceiveProps(updated_props) {
        if (this.state.projectName !== updated_props.project) {
            this.setState(
                {selectedIssue: "", projectName: updated_props.project},
                () => {
                    this.updateIssuesList();
                }
            );
        }
    }

    updateIssuesList() {
        let project_issues = DB.issues[this.props.project];
        if (project_issues) {
            this.setState({all_issues: project_issues}, () => {
                this.updatePageNumber(1);
            });
        } else {
            this.setState({all_issues: []}, () => {
                this.updatePageNumber(1);
            });
        }
    }

    render() {
        const so = this.state.asc_sort_order ? "up " : "down ";
        const totalPages = this.state.all_issues.length / this.state.pageSize;
        const {activePage, selectedIssue} = this.state;
        let toggleSort = () => {
            this.setState({asc_sort_order: !this.state.asc_sort_order});
        };
        let paginationNum = [];
        for (let i = 0; i < totalPages; i++) {
            paginationNum.push(
                <li key={i} className={"page-item " + (activePage === i + 1 ? "active" : "")}
                    onClick={() => this.updatePageNumber(i + 1)}>
                    <a className="page-link" href="#">{i + 1}</a>
                </li>);
        }
        if (selectedIssue)
            return (
                <DetailsComponent
                    goBack={() => this.selectIssue("")}
                    issueId={selectedIssue}
                    project={this.props.project}
                    issue_summary={this.state.issue_summary}
                    nm={this.props.nm}
                />
            );

        return (
            <div className="container">
                <table className="table table-hover table-responsive-sm">
                    <thead className="thead-light">
                    <tr>
                        <th>Incident Id</th>
                        <th>Entity Type</th>
                        <th>Entity Id</th>
                        <th onClick={toggleSort}>
                            <i className={"fas mr-1 fa-sort-" + so}/>
                            Updated On
                        </th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Summary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.issues.map(ei => this.getRowFromIssue(ei))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={"page-item"}
                            onClick={() => this.updatePageNumber(activePage - 1)}>
                            <a className={"page-link " + (activePage === 1 ? "disabled" : "")} href="#">Previous</a>
                        </li>
                        {paginationNum.map(e => e)}
                        <li className={"page-item"}
                            onClick={() => this.updatePageNumber(activePage + 1)}>
                            <a className={"page-link " + +(activePage === totalPages ? "disabled" : "")}
                               href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    selectIssue(issueId, issue_summary = {}) {
        if (!issueId) this.setState({selectedIssue: issueId, issue_summary: {}});
        else
            this.setState({
                selectedIssue: issueId,
                issue_summary: issue_summary,
                lastVisitedIssue: issueId
            });
    }

    getRowFromIssue(each_issue) {
        const displayDate = new Date(
            parseInt(each_issue["updated_on"])
        ).toLocaleString("en-IN", {timeZone: "UTC"});
        const is_warning_issue = parseInt(each_issue["score"]) >= 700;
        const is_last_visited =
            this.state.lastVisitedIssue === each_issue["incident_id"];
        const tableClasses = classNames({
            "table-active": is_last_visited, "disabled": each_issue.status === "Closed",
            "table-warning": is_warning_issue
        });

        return (
            <tr key={"incident_" + each_issue["incident_id"]}
                onClick={() => this.selectIssue(each_issue["incident_id"], each_issue)}
                className={tableClasses}>
                <td>
                    <span className="badge badge-primary">
                        {each_issue["incident_id"]}
                    </span>
                </td>
                <td>
                    {this.getIconForEntityType(each_issue["entity_type"])}
                </td>
                <td>{each_issue["entity_id"]}</td>
                <td> {displayDate} </td>
                <td>{each_issue["status"]}</td>
                <td>
                    {is_warning_issue && <span className="mr-1"><i className="fas fa-exclamation-circle"/></span>}
                    {each_issue["score"]}
                </td>
                <td>{each_issue["summary"]}</td>
            </tr>
        );
    }

    getIconForEntityType(entity_type) {
        if (entity_type === "Account") {
            return (
                <span className="badge badge-info">
                    <span className="mr-1">
                        <i className="fas fa-folder"/>
                    </span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Customer") {
            return (
                <span className="badge badge-info">
                    <span className="mr-1">
                        <i className="fas fa-users"/>
                    </span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Employee") {
            return (
                <span className="badge badge-info">
                    <span className="mr-1">
                        <i className="fas fa-suitcase"/>
                    </span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Branch") {
            return (
                <span className="badge badge-info">
                    <span className="mr-1">
                        <i className="fas fa-code-branch"/>
                    </span>
                    {entity_type}
                </span>
            );
        }
    }

    updatePageNumber(activePage) {
        const totalPages = this.state.all_issues.length / this.state.pageSize;
        if (activePage <= 0 || activePage >= totalPages + 1 || activePage === this.state.activePage)
            return;
        let pg = this.state.pageSize;
        let slice = this.state.all_issues.slice(
            pg * (activePage - 1),
            pg * activePage
        );
        this.setState({activePage: activePage, issues: slice});
    }


}
