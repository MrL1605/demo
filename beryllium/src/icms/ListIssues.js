import React, {Component} from "react";
import {DB} from "../API";
import {classNames} from "../App";
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
                this.updatePageNumber(null, {activePage: 1});
            });
        } else {
            this.setState({all_issues: []}, () => {
                this.updatePageNumber(null, {activePage: 1});
            });
        }
    }

    render() {
        const so = this.state.asc_sort_order ? "ascending " : "descending ";
        const totalPages = this.state.all_issues.length / this.state.pageSize;
        const selectedIssue = this.state.selectedIssue;
        let toggleSort = () => {
            this.setState({asc_sort_order: !this.state.asc_sort_order});
        };
        const darkTableClass = this.props.nm ? "has-background-grey-darker has-text-white" : "";
        // if (selectedIssue)
        //     return (
        //         <DetailsComponent
        //             goBack={() => this.selectIssue("")}
        //             issueId={selectedIssue}
        //             project={this.props.project}
        //             issue_summary={this.state.issue_summary}
        //             nm={this.props.nm}
        //         />
        //     );

        return (
            <div className="container">
                <div>
                    <table className="table is-striped is-hoverable is-fullwidth">
                        <thead>
                        <tr className={darkTableClass}>
                            <th className={darkTableClass}>Incident Id</th>
                            <th className={darkTableClass}>Entity Type</th>
                            <th className={darkTableClass}>Entity Id</th>
                            <th className={"sorted " + so + darkTableClass} onClick={toggleSort}>Updated On</th>
                            <th className={darkTableClass}>Status</th>
                            <th className={darkTableClass}>Score</th>
                            <th className={darkTableClass}>Summary</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.issues.map(ei => this.getRowFromIssue(ei))}
                        </tbody>
                    </table>
                </div>
            </div>

            // <Container>
            //     <div className="ui centered">
            //         <Pagination
            //             inverted={this.props.nm}
            //             onPageChange={this.updatePageNumber}
            //             defaultActivePage={1}
            //             ellipsisItem={{
            //                 content: <Icon name="ellipsis horizontal"/>,
            //                 icon: true
            //             }}
            //             boundaryRange={0}
            //             siblingRange={1}
            //             firstItem={{
            //                 content: <Icon name="angle double left"/>,
            //                 icon: true
            //             }}
            //             lastItem={{
            //                 content: <Icon name="angle double right"/>,
            //                 icon: true
            //             }}
            //             prevItem={{content: <Icon name="angle left"/>, icon: true}}
            //             nextItem={{content: <Icon name="angle right"/>, icon: true}}
            //             totalPages={totalPages}
            //         />
            //     </div>
            // </Container>
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
            "is-active": is_last_visited, "disabled": each_issue.status === "Closed",
            "is-warning": is_warning_issue, "has-background-grey-dark has-text-white ": this.props.nm
        });

        return (
            <tr key={"incident_" + each_issue["incident_id"]}
                onClick={() => this.selectIssue(each_issue["incident_id"], each_issue)}
                className={tableClasses}>
                <td>
                    <span className="tag is-success is-light is-normal">
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
                    {is_warning_issue && <span className="fa fas-attention"/>}
                    {each_issue["score"]}
                </td>
                <td>{each_issue["summary"]}</td>
            </tr>
        );
    }

    getIconForEntityType(entity_type) {
        const tagClasses = classNames({"tag is-light": !this.props.nm, "tag is-white": this.props.nm});
        if (entity_type === "Account") {
            return (
                <span className={tagClasses}>
                    <span className="icon">
                        <i className="fas fa-folder"/>
                    </span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Customer") {
            return (
                <span className={tagClasses}>
                    <span className="icon">
                        <i className="fas fa-users"/>
                    </span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Employee") {
            return (
                <span className={tagClasses}>
                    <span className="icon">
                        <i className="fas fa-suitcase"/>
                    </span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Branch") {
            return (
                <span className={tagClasses}>
                    <span className="icon">
                        <i className="fas fa-code-branch"/>
                    </span>
                    {entity_type}
                </span>
            );
        }
    }

    updatePageNumber(_, {activePage}) {
        let pg = this.state.pageSize;
        let slice = this.state.all_issues.slice(
            pg * (activePage - 1),
            pg * activePage
        );
        this.setState({issues: slice});
    }


}
