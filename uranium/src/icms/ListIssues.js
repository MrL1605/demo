import React, {Component} from "react";
import {DB} from "../API";

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
            this.setState({projectName: this.props.project, all_issues: project_issues}, () => {
                this.updatePageNumber({activePage: 1});
            });
        } else {
            this.setState({projectName: this.props.project, all_issues: []}, () => {
                this.updatePageNumber({activePage: 1});
            });
        }
    }

    render() {
        const so = this.state.asc_sort_order ? "ascending" : "descending";
        const totalPages = this.state.all_issues.length / this.state.pageSize;
        const selectedIssue = this.state.selectedIssue;
        let toggleSort = () => {
            this.setState({asc_sort_order: !this.state.asc_sort_order});
        };
        /*
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
        */
        let paginationNum = [];
        for (let i = 0; i < totalPages; i++) {
            paginationNum.push(<li key={i} onClick={() => this.updatePageNumber({activePage: i + 1})}> {i + 1}</li>);
        }

        return (
            <div className="uk-container uk-margin-large-bottom">
                <div data-uk-grid={true}>
                    <div className="uk-width-3-4">
                        <table className="uk-table uk-table-responsive uk-table-divider uk-table-hover">
                            <thead>
                            <tr>
                                <th>Incident Id</th>
                                <th>Entity Type</th>
                                <th>Entity Id</th>
                                <th className={"sorted " + so} onClick={toggleSort}>
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
                        <ul className="uk-pagination uk-flex-center">
                            <li><a href="#"><span data-uk-pagination-previous={true}/></a></li>
                            {paginationNum.map(e => e)}
                            <li>
                            </li>
                            <li><a href="#"><span data-uk-pagination-next={true}/></a></li>
                        </ul>
                    </div>
                    <div className="uk-width-1-4" style={{paddingTop: "50px"}}>
                        <div className="uk-card uk-card-secondary uk-card-body"
                             data-uk-sticky="offset: 80">
                            <h3 className="uk-card-title">Project Filters</h3>
                            <dl>
                                <dt>Project:</dt>
                                <dd>{this.state.projectName}</dd>
                                <dt>Score:</dt>
                                <dd> > 200</dd>
                                <dt>Priority</dt>
                                <dd> > Severe</dd>
                            </dl>
                        </div>
                    </div>
                </div>
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
            parseInt(each_issue.updated_on)
        ).toLocaleString("en-IN", {timeZone: "UTC"});
        const is_warning_issue = parseInt(each_issue.score) >= 700;
        const is_last_visited =
            this.state.lastVisitedIssue === each_issue.incident_id;

        return (
            <tr data-uk-scrollspy="cls:uk-animation-fade; repeat: true" key={each_issue.incident_id}>
                <td>
                    <span className="uk-label"> {each_issue.incident_id} </span>
                </td>
                <td>
                    {this.getIconForEntityType(each_issue.entity_type)}
                </td>
                <td>{each_issue.entity_id}</td>
                <td> {displayDate} </td>
                <td>{each_issue.status}</td>
                <td>
                    {is_warning_issue && <span data-uk-icon="icon: heart"/>}
                    {each_issue.score}
                </td>
                <td>{each_issue.summary}</td>
            </tr>
        );
    }

    getIconForEntityType(entity_type) {
        if (entity_type === "Account") {
            return (
                <span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Customer") {
            return (
                <span>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Employee") {
            return (
                <span>
                    <span name="suitcase"/>
                    {entity_type}
                </span>
            );
        } else if (entity_type === "Branch") {
            return (
                <span>
                    <span name="code branch"/>
                    {entity_type}
                </span>
            );
        }
    }

    updatePageNumber({activePage}) {
        let pg = this.state.pageSize;
        let slice = this.state.all_issues.slice(
            pg * (activePage - 1),
            pg * activePage
        );
        this.setState({issues: slice});
    }
}
