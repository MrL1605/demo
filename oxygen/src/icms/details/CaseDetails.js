import React, {Component} from "react";
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
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#" onClick={() => toggleTabActive("case")}>
                            <h5>
                                Case Details
                                <i className={"fas ml-1 fa-caret-" + (sT["case"] ? "down" : "right")}/>
                            </h5>
                        </a>
                    </li>
                </ul>
                {sT["case"] && (
                    <div>
                        {(iDetails && (
                            <div className='row'>
                                <div className="col-7">
                                    <table className="table table-hover">
                                        <tbody>
                                        <tr>
                                            <th>Case Id</th>
                                            <td>{iDetails.case_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Case Entity Id</th>
                                            <td>{iDetails.case_entity_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Case Entity Type</th>
                                            <td>
                                                {this.getIconForEntityType(
                                                    iDetails["case_entity_type"]
                                                )}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                </div>
                                <div className="col-5">
                                    <table className="table table-hover">
                                        <tbody>
                                        <tr>
                                            <th>Assignee Id</th>
                                            <td>{iDetails.case_assignee_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{iDetails.case_status}</td>
                                        </tr>
                                        <tr>
                                            <th>Resolution</th>
                                            <td> -</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )) ||
                        this.getPlaceHolder()}
                    </div>
                )}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#" onClick={() => toggleTabActive("incident")}>
                            <h5>
                                Incident Details
                                <i className={"fas ml-1 fa-caret-" + (sT["incident"] ? "down" : "right")}/>
                            </h5>
                        </a>
                    </li>
                </ul>
                <div>
                    <table className="table table-hover">
                        <tr>
                            <th>
                                Actions
                            </th>
                            <td>
                                <div className="form-inline">
                                    <button type="button" className="btn btn-primary ml-2"
                                            onClick={() => downloadButtonLoading()}>
                                        {(this.state.downloadButtonState === 1 && (
                                            <div className="spinner-grow" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        )) || (
                                            <span>
                                                <i className={"fas mr-1 fa-cloud-download-alt"}/>
                                            </span>
                                        )}
                                    </button>
                                    <button type="button" className="btn btn-secondary ml-2" data-toggle="modal"
                                            data-target="#confirmModal"
                                            onClick={() => confirmPopup(`Confirm to assign [${iDetails["case_id"]}]`)}>
                                        <i className={"fas mr-1 fa-angle-double-right"}/>
                                        Assign Incident
                                    </button>
                                    <button type="button" className="btn btn-light ml-2" data-toggle="modal"
                                            data-target="#confirmModal"
                                            onClick={() => confirmPopup(`Confirm to close [${iDetails["case_id"]}] case`)}>
                                        <i className={"fas mr-1 fa-archive"}/>
                                        Close Incident
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                {sT["incident"] && (
                    <div>
                        {(iDetails && (
                            <div className="row">
                                <div className="col-7">
                                    <table className="table table-hover">
                                        <tr>
                                            <th>Incident Id</th>
                                            <td><span className="badge badge-primary">{this.props.issueId}
                                            </span></td>
                                        </tr>
                                        <tr>
                                            <th>Incident Entity Type</th>
                                            <td>
                                                {this.getIconForEntityType(iSummary.entity_type)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Incident Entity Id</th>
                                            <td> {iSummary.entity_id} </td>
                                        </tr>
                                        <tr>
                                            <th>Incident Score</th>
                                            <td> {iSummary.score} </td>
                                        </tr>
                                        <tr>
                                            <th>Priority</th>
                                            {this.getIconForPriority(iDetails.priority)}
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        )) ||
                        this.getPlaceHolder()}
                    </div>
                )}

                <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.popupContent}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        onClick={() => confirmPopup("")}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={() => confirmPopup("")}>
                                    Save changes
                                </button>
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

    getIconForPriority(p) {
        if (p === "Severe")
            return (
                <td>
                    <span className="text-danger">
                        <i className={"fas mr-1 fa-angle-up"}/>
                    </span>
                    {p}
                </td>
            );
        else if (p === "Major")
            return (
                <td>
                    <span className="text-danger">
                        <i className={"fas mr-1 fa-angle-up"}/>
                    </span>
                    {p}
                </td>
            );
        else if (p === "Minor")
            return (
                <td>
                    <span className="text-success">
                        <i className={"fas mr-1 fa-angle-down"}/>
                    </span>
                    {p}
                </td>
            );
    }

    getIconForFraud(_if) {
        if (_if)
            return (
                <td>
                    <span className="text-danger">
                        <i className={"fas mr-1 fa-check"}/>
                    </span>
                    Yes
                </td>
            );
        else
            return (
                <td>
                    <span className="text-success">
                        <i className={"fas mr-1 fa-x"}/>
                    </span>
                    No
                </td>
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

}
