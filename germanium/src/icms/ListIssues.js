import React, {Component} from "react";
import {DB} from "../API";
import {Badge, Icon, minorScale, Pane, Table, Text} from "evergreen-ui";
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
            <Pane>
                <Table>
                    <Table.Head>
                        <Table.SearchHeaderCell/>
                        <Table.TextHeaderCell>Entity Type</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Entity Id</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Status</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Score</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Summary</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body height={"100%"}>
                        {this.state.issues.map(ei => this.getRowFromIssue(ei))}
                    </Table.Body>
                </Table>
                <div className="">
                    {/*
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
*/}
                </div>
            </Pane>
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
                isSelectable={each_issue.status !== "Closed"}
                intent={is_warning_issue ? "warning" : "none"}
                // inverted={this.props.nm}
                key={"incident_" + each_issue.incident_id}
                onSelect={() => this.selectIssue(each_issue.incident_id, each_issue)}
            >
                <Table.TextCell>
                    <Badge color={"purple"}>
                        {each_issue.incident_id}
                    </Badge>
                </Table.TextCell>
                <Table.TextCell>
                    {this.getIconForEntityType(each_issue.entity_type)}
                </Table.TextCell>
                <Table.TextCell>{each_issue.entity_id}</Table.TextCell>
                <Table.TextCell> {displayDate} </Table.TextCell>
                <Table.TextCell>{each_issue.status}</Table.TextCell>
                <Table.TextCell isNumber>
                    {is_warning_issue && <Icon icon="warning-sign"/>} {each_issue.score}
                </Table.TextCell>
                <Table.TextCell>{each_issue.summary}</Table.TextCell>
            </Table.Row>
        );
    }

    getIconForEntityType(entity_type) {
        if (entity_type === "Account") {
            return (
                <Badge color={"neutral"}>
                    <Text size={300}>
                        <Icon icon="folder-close" marginRight={minorScale(1)}
                              size={minorScale(3)} title={entity_type}/>
                        {entity_type}
                    </Text>
                </Badge>
            );
        } else if (entity_type === "Customer") {
            return (
                // <Badge color={"neutral"}>
                <Badge>
                    <Text size={300}>
                        <Icon icon="person" marginRight={minorScale(1)}
                              size={minorScale(3)} title={entity_type}/>
                        {entity_type}
                    </Text>
                </Badge>
            );
        } else if (entity_type === "Employee") {
            return (
                <Badge>
                    <Text size={300}>
                        <Icon icon="briefcase" marginRight={minorScale(1)}
                              size={minorScale(3)} title={entity_type}/>
                        {entity_type}
                    </Text>
                </Badge>
            );
        } else if (entity_type === "Branch") {
            return (
                <Badge>
                    <Text size={300}>
                        <Icon icon="git-branch" marginRight={minorScale(1)}
                              size={minorScale(3)} title={entity_type}/>
                        {entity_type}
                    </Text>
                </Badge>
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
