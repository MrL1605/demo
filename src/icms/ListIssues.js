import React, {Component} from "react";
import {Table, Container, Pagination} from "semantic-ui-react";
import {Icon, Label, Menu} from "semantic-ui-react";
import {DB} from "../API";
import DetailsComponent from "./DetailsComponent";

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
        const so = this.state.asc_sort_order ? "ascending" : "descending";
        const totalPages = this.state.all_issues.length / this.state.pageSize;
        const selectedIssue = this.state.selectedIssue;
        let toggleSort = () => {
            this.setState({asc_sort_order: !this.state.asc_sort_order});
        };
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
            <Container>
                <Table
                    celled
                    selectable
                    sortable
                    compact
                    singleLine
                    inverted={this.props.nm}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Incident Id</Table.HeaderCell>
                            <Table.HeaderCell>Entity Type</Table.HeaderCell>
                            <Table.HeaderCell>Entity Id</Table.HeaderCell>
                            <Table.HeaderCell className={"sorted " + so} onClick={toggleSort}>
                                Updated On
                            </Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                            <Table.HeaderCell>Summary</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.issues.map(ei => this.getRowFromIssue(ei))}
                    </Table.Body>
                </Table>
                <div className="ui centered">
                    <Pagination
                        inverted={this.props.nm}
                        onPageChange={this.updatePageNumber}
                        defaultActivePage={1}
                        ellipsisItem={{
                            content: <Icon name="ellipsis horizontal"/>,
                            icon: true
                        }}
                        boundaryRange={0}
                        siblingRange={1}
                        firstItem={{
                            content: <Icon name="angle double left"/>,
                            icon: true
                        }}
                        lastItem={{
                            content: <Icon name="angle double right"/>,
                            icon: true
                        }}
                        prevItem={{content: <Icon name="angle left"/>, icon: true}}
                        nextItem={{content: <Icon name="angle right"/>, icon: true}}
                        totalPages={totalPages}
                    />
                </div>
            </Container>
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
            <Table.Row
                disabled={each_issue.status === "Closed"}
                // warning={is_warning_issue}
                // inverted={this.props.nm}
                key={"incident_" + each_issue.incident_id}
                onClick={() => this.selectIssue(each_issue.incident_id, each_issue)}
            >
                <Table.Cell>
                    <Label size="small" color="violet" ribbon={is_last_visited}>
                        {each_issue.incident_id}
                    </Label>
                </Table.Cell>
                <Table.Cell>
                    {this.getIconForEntityType(each_issue.entity_type)}
                </Table.Cell>
                <Table.Cell>{each_issue.entity_id}</Table.Cell>
                <Table.Cell> {displayDate} </Table.Cell>
                <Table.Cell>{each_issue.status}</Table.Cell>
                <Table.Cell>
                    {is_warning_issue && <Icon name="attention"/>}
                    {each_issue.score}
                </Table.Cell>
                <Table.Cell>{each_issue.summary}</Table.Cell>
            </Table.Row>
        );
    }

    getIconForEntityType(entity_type) {
        if (entity_type === "Account") {
            return (
                <Label image color={this.props.nm ? "black" : "default"}>
                    <Icon name="folder outline"/> {entity_type}
                </Label>
            );
        } else if (entity_type === "Customer") {
            return (
                <Label image color={this.props.nm ? "black" : "default"}>
                    <Icon name="users"/>
                    {entity_type}
                </Label>
            );
        } else if (entity_type === "Employee") {
            return (
                <Label image color={this.props.nm ? "black" : "default"}>
                    <Icon name="suitcase"/>
                    {entity_type}
                </Label>
            );
        } else if (entity_type === "Branch") {
            return (
                <Label image color={this.props.nm ? "black" : "default"}>
                    <Icon name="code branch"/>
                    {entity_type}
                </Label>
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
