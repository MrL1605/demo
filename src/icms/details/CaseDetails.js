import React, {Component} from "react";
import {
    Menu,
    Icon,
    Segment,
    Placeholder,
    Grid,
    Divider,
    Table,
    Label,
    Button,
    Confirm
} from "semantic-ui-react";
import {DB} from "../../API";

export default class CaseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTabs: {
                case: true,
                incident: true
            },
            popupContent: ""
        };
    }

    componentDidMount() {
        setTimeout(() => {
            if (DB.issue_details) {
                this.setState({issue_details: DB.issue_details[this.props.issueId]});
            }
        }, 2000);
    }

    render() {
        const sT = this.state.showTabs;
        const iDetails = this.state.issue_details;
        const iSummary = this.props.issue_summary;
        const toggleTabActive = tabName => {
            let updateST = sT;
            updateST[tabName] = !updateST[tabName];
            this.setState({showTabs: updateST});
        };
        const confirmPopup = content => {
            this.setState({popupContent: content});
        };
        const downloadButtonLoading = () => {
            this.setState({downloadButtonState: 1});
            setTimeout(() => {
                this.setState({downloadButtonState: 0});
            }, 2000);
        };

        return (
            <div>
                <Menu attached="top" tabular inverted={this.props.nm}>
                    <Menu.Item
                        name="case"
                        color="brown"
                        content={
                            <h5>
                                Case Details
                                <Icon name={"caret " + (sT["case"] ? "down" : "right")}/>
                            </h5>
                        }
                        active={sT["case"]}
                        onClick={() => {
                            toggleTabActive("case");
                        }}
                    />
                </Menu>
                {sT["case"] && (
                    <Segment attached="bottom" color="brown" inverted={this.props.nm}>
                        {(iDetails && (
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Table definition inverted={this.props.nm}>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>Case Id</Table.Cell>
                                                    <Table.Cell>{iDetails.case_id}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Case Entity Id</Table.Cell>
                                                    <Table.Cell>{iDetails.case_entity_id}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Case Entity Type</Table.Cell>
                                                    <Table.Cell>
                                                        {this.getIconForEntityType(
                                                            iDetails.case_entity_type
                                                        )}
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Divider hidden/>
                                    <Grid.Column>
                                        <Table definition inverted={this.props.nm}>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>Assignee Id</Table.Cell>
                                                    <Table.Cell>{iDetails.case_assignee_id}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Status</Table.Cell>
                                                    <Table.Cell>{iDetails.case_status}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Resolution</Table.Cell>
                                                    <Table.Cell> - </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )) ||
                        this.getPlaceHolder()}
                    </Segment>
                )}
                <Menu attached="top" tabular inverted={this.props.nm}>
                    <Menu.Item
                        name="incident"
                        color="brown"
                        content={
                            <h5>
                                Incident Details
                                <Icon name={"caret " + (sT["incident"] ? "down" : "right")}/>
                            </h5>
                        }
                        active={sT["incident"]}
                        onClick={() => {
                            toggleTabActive("incident");
                        }}
                    />
                    <Menu.Menu position="right">
                        <Menu.Item
                            name="download"
                            content={
                                <Button
                                    icon
                                    primary
                                    loading={this.state.downloadButtonState === 1}
                                    onClick={() => downloadButtonLoading()}
                                    inverted={this.props.nm}
                                >
                                    <Icon name="cloud download"/>
                                </Button>
                            }
                        />
                        <Menu.Item
                            name="assign"
                            content={
                                <Button
                                    icon
                                    secondary
                                    labelPosition="left"
                                    onClick={() =>
                                        confirmPopup(`Confirm to assign [${iDetails.case_id}]`)
                                    }
                                    inverted={this.props.nm}
                                >
                                    <Icon name="angle double right"/>
                                    Assign Incident
                                </Button>
                            }
                        />
                        <Menu.Item
                            name="close"
                            content={
                                <Button
                                    icon
                                    labelPosition="right"
                                    onClick={() =>
                                        confirmPopup(`Confirm to close [${iDetails.case_id}] case`)
                                    }
                                    inverted={this.props.nm}
                                >
                                    <Icon name="archive"/> Close Incident
                                </Button>
                            }
                        />
                    </Menu.Menu>
                </Menu>
                {sT["incident"] && (
                    <Segment attached="bottom" color="brown" inverted={this.props.nm}>
                        {(iDetails && (
                            <Grid inverted={this.props.nm}>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Table definition inverted={this.props.nm}>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>Incident Id</Table.Cell>
                                                    <Table.Cell>
                                                        <Label size="small" color="violet">
                                                            {this.props.issueId}
                                                        </Label>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Incident Entity Type</Table.Cell>
                                                    <Table.Cell>
                                                        {this.getIconForEntityType(iSummary.entity_type)}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Incident Entity Id</Table.Cell>
                                                    <Table.Cell> {iSummary.entity_id} </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Incident Score</Table.Cell>
                                                    <Table.Cell> {iSummary.score} </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Priority</Table.Cell>
                                                    {this.getIconForPriority(iDetails.priority)}
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Table definition inverted={this.props.nm}>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>Assignee</Table.Cell>
                                                    <Table.Cell>{iDetails.assignee}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Indication of Fraud</Table.Cell>
                                                    {this.getIconForFraud(iDetails.indication_fraud)}
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Status</Table.Cell>
                                                    <Table.Cell>{iSummary.status}</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={1} style={{paddingTop: "0"}}>
                                    <Grid.Column>
                                        <Table definition inverted={this.props.nm}>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>Risk Level</Table.Cell>
                                                    <Table.Cell>{iDetails.risk_level}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Scenario ID</Table.Cell>
                                                    <Table.Cell>{iDetails.scenario_id}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Incident Detail</Table.Cell>
                                                    <Table.Cell>{iDetails.incident_detail}</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )) ||
                        this.getPlaceHolder()}
                    </Segment>
                )}

                <Confirm
                    open={!!this.state.popupContent}
                    header="Are you sure?"
                    content={this.state.popupContent}
                    onCancel={() => confirmPopup("")}
                    onConfirm={() => confirmPopup("")}
                    inverted={this.props.nm}
                />
            </div>
        );
    }

    getPlaceHolder() {
        return (
            <Placeholder style={{marginLeft: "50px"}} inverted={this.props.nm}>
                <Placeholder.Header image>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder.Paragraph>
            </Placeholder>
        );
    }

    getIconForPriority(p) {
        if (p === "Severe")
            return (
                <Table.Cell>
                    <Icon name="angle double up" color="red"/>
                    {p}
                </Table.Cell>
            );
        else if (p === "Major")
            return (
                <Table.Cell>
                    <Icon name="angle up" color="red"/>
                    {p}
                </Table.Cell>
            );
        else if (p === "Minor")
            return (
                <Table.Cell>
                    <Icon name="angle down" color="green"/>
                    {p}
                </Table.Cell>
            );
    }

    getIconForFraud(_if) {
        if (_if)
            return (
                <Table.Cell>
                    <Icon name="check" color="red"/> Yes
                </Table.Cell>
            );
        else
            return (
                <Table.Cell>
                    <Icon name="x" color="green"/> No
                </Table.Cell>
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
}
