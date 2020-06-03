import React, {Component} from "react";
import {
    Breadcrumb,
    Card,
    Container,
    Grid,
    Icon,
    Image,
    Item,
    Menu,
    Placeholder,
    Rail,
    Ref,
    Segment,
    Step,
    Sticky
} from "semantic-ui-react";
import CaseDetails from "./details/CaseDetails";
import {DB} from "../API";
import ActivityComponent from "./details/ActivityComponent";

export default class DetailsComponent extends Component {
    contextRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            showTabs: {
                activity: true
            }
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({commentDetails: DB.issue_comments[this.props.issueId]});
        }, 3500);
    }

    render() {
        const sT = this.state.showTabs;
        const commentDetails = this.state.commentDetails;
        const toggleTabActive = tabName => {
            let updateST = sT;
            updateST[tabName] = !updateST[tabName];
            this.setState({showTabs: updateST});
        };

        return (
            <Ref>
                <Container fluid style={{padding: "0 5%"}}>
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Section link onClick={() => this.props.goBack()}>
                                {this.props.project}
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="right chevron"/>
                            <Breadcrumb.Section link>{this.props.issueId}</Breadcrumb.Section>
                            <Breadcrumb.Divider icon="right chevron"/>
                            <Breadcrumb.Section active>Incident Details</Breadcrumb.Section>
                        </Breadcrumb>
                    </div>

                    <Step.Group>
                        <Step active>
                            <Icon name="chart line"/>
                            <Step.Content>
                                <Step.Title>Incident Details</Step.Title>
                                <Step.Description>
                                    Case details and incident details
                                </Step.Description>
                            </Step.Content>
                        </Step>
                        <Step>
                            <Icon name="address card"/>
                            <Step.Content>
                                <Step.Title>Evidence Details</Step.Title>
                                <Step.Description>
                                    Detailed Evidence for Incident
                                </Step.Description>
                            </Step.Content>
                        </Step>
                        <Step>
                            <Icon name="sitemap"/>
                            <Step.Content>
                                <Step.Title>Link Analysis</Step.Title>
                                <Step.Description>Head over for linkage</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>

                    <Grid floated="left" columns={2}>
                        <Grid.Column width={12}>
                            <Ref innerRef={this.contextRef}>
                                <Container fluid>
                                    {/* Big huge Case Details here  */}
                                    <CaseDetails
                                        issueId={this.props.issueId}
                                        issue_summary={this.props.issue_summary}
                                        nm={this.props.nm}
                                    />

                                    <div>
                                        {/* Activity menu here  */}
                                        <Menu attached="top" tabular style={{marginTop: "1rem"}}
                                              inverted={this.props.nm}>
                                            <Menu.Item
                                                name="activity"
                                                color="brown"
                                                content={
                                                    <h5>
                                                        Activity
                                                        <Icon
                                                            name={
                                                                "caret " + (sT["activity"] ? "down" : "right")
                                                            }
                                                        />
                                                    </h5>
                                                }
                                                active={sT["activity"]}
                                                onClick={() => {
                                                    toggleTabActive("activity");
                                                }}
                                                inverted={this.props.nm}
                                            />
                                        </Menu>
                                        {sT["activity"] && (
                                            <Segment
                                                color="brown"
                                                attached="bottom"
                                                inverted={this.props.nm}
                                            >
                                                {(commentDetails && (
                                                    <ActivityComponent comments={commentDetails}/>
                                                )) ||
                                                this.getPlaceHolder()}
                                            </Segment>
                                        )}
                                    </div>
                                    <Rail position="right" attached>
                                        <Sticky
                                            bottomOffset={300}
                                            offset={0}
                                            styleElement={{marginTop: "60px"}}
                                            context={this.contextRef}
                                        >
                                            <Card inverted={this.props.nm}>
                                                <Card.Content header="Pinned Details"/>
                                                <Card.Content
                                                    description={
                                                        <Item.Group relaxed>
                                                            <Item>
                                                                <Item.Content>
                                                                    <Item.Header as="span">Assignee</Item.Header>
                                                                    <Item.Description>
                                                                        <Image
                                                                            src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                                                                            avatar
                                                                            circular
                                                                        />
                                                                        Super Jenny
                                                                    </Item.Description>
                                                                </Item.Content>
                                                            </Item>
                                                            <Item>
                                                                <Item.Content>
                                                                    <Item.Header as="span">
                                                                        Risk Level
                                                                    </Item.Header>
                                                                    <Item.Description>L2</Item.Description>
                                                                </Item.Content>
                                                            </Item>

                                                            <Item>
                                                                <Item.Content>
                                                                    <Item.Header as="span">Priority</Item.Header>
                                                                    <Item.Description>
                                    <span className="ui red">
                                      <Icon
                                          name="angle double up"
                                          color="red"
                                      />
                                      Severe
                                    </span>
                                                                    </Item.Description>
                                                                </Item.Content>
                                                            </Item>
                                                        </Item.Group>
                                                    }
                                                />
                                                <Card.Content extra>
                                                    <Icon name="comments"/>4 Comments
                                                </Card.Content>
                                            </Card>
                                        </Sticky>
                                    </Rail>
                                </Container>
                            </Ref>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Ref>
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
}
