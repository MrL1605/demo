import React, {Component} from "react";
import {DB} from "../API";

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
            <div>
                <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#" onClick={() => this.props.goBack()}>
                                    {this.props.project}
                                </a>
                            </li>
                            <li className="breadcrumb-item"><a href="#">{this.props.issueId}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Incident Details</li>
                        </ol>
                    </nav>

                    {/*
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
*/}

                    <div className="row">
                        <div className="col-8">
                            {/* Big huge Case Details here  */}
                            {this.getPlaceHolder()}
                            {/*
                                    <CaseDetails
                                        issueId={this.props.issueId}
                                        issue_summary={this.props.issue_summary}
                                        nm={this.props.nm}
                                    />
                                    */}

                            {/*<div>*/}
                            {/* Activity menu here  */}
                            {/*
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
*/}
                        </div>
                        <div className="col-4">
                            <div className="card text-white bg-secondary mb-3">
                                <div className="card-header">Pinned Details</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-secondary">
                                        <dl>
                                            <dt>Project:</dt>
                                            <dd>{this.state.projectName}</dd>
                                        </dl>
                                    </li>
                                    <li className="list-group-item list-group-item-secondary">
                                        <dl>
                                            <dt>Score:</dt>
                                            <dd>200</dd>
                                        </dl>
                                    </li>
                                    <li className="list-group-item list-group-item-secondary">
                                        <dl>
                                            <dt>Priority</dt>
                                            <dd>Severe</dd>
                                        </dl>
                                    </li>
                                </ul>
                                <div className="card-footer">4 comments</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getPlaceHolder() {
        return (
            <div className="spinner-grow" style={{width: "4rem", height: "4rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}
