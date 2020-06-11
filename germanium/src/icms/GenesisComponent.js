import React, {Component} from "react";
import {DB} from "../API";
import HeaderComponent from "./HeaderComponent";
import {Icon, IconButton, majorScale, Menu, minorScale, Pane, Position, SideSheet, Spinner} from "evergreen-ui";
import ListIssues from "./ListIssues";

export default class GenesisComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            removeSidebar: true,
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
        const updateSideBarState = visibility => {
            if (visibility) this.setState({visible: true});
            else this.setState({visible: false});
        };
        const setProject = p => {
            if (p) this.setState({project: p, visible: false});
            else this.setState({visible: false});
        };
        const {projectList, project, visible, removeSidebar} = this.state;

        return (
            <div style={{height: "100%", position: "relative"}}>

                <Pane is="section"
                      padding={majorScale(10)}
                      style={{position: "absolute", width: "100%", marginBottom: "0"}}>
                    <div style={{marginTop: minorScale(18)}}/>
                    {(project
                        && <ListIssues project={project} nm={this.state.nm}/>)
                    || this.getPlaceHolders()}
                </Pane>


                <SideSheet position={Position.LEFT} isShown={visible} width={majorScale(40)}
                           onCloseComplete={() => updateSideBarState(false)}>
                    {projectList.length && (
                        <Menu>
                            <Menu.Item height={majorScale(8)} marginTop={majorScale(10)}
                                       onClick={() => setProject("")}>
                                <Icon marginRight={minorScale(3)} icon="inbox-search"/> Search
                            </Menu.Item>
                            <Menu.Group title={"Projects"}>
                                {projectList.map(p => (
                                    <Menu.Item key={p} height={majorScale(8)}
                                               background={p === project ? "purpleTint" : "default"}
                                               onSelect={() => setProject(p)}>
                                        {p}
                                    </Menu.Item>
                                ))}
                            </Menu.Group>
                        </Menu>
                    ) || this.getPlaceHolders()}
                </SideSheet>

                <IconButton icon={"menu-open"} appearance={"minimal"} margin={majorScale(2)}
                            style={{position: "fixed", top: "10%"}}
                            onClick={() => updateSideBarState(true)}/>


                {/*
                <Sidebar.Pushable
                    as={Segment}
                    style={{
                        marginTop: "0",
                        background: "none",
                        border: 0,
                        height: removeSidebar ? "0" : "100%",
                        width: removeSidebar ? "0" : "100%",
                        position: "absolute"
                    }}
                >
                    {projectList.length && (
                        <Sidebar
                            as={Menu}
                            animation="overlay"
                            icon="labeled"
                            inverted
                            onHidden={() => removeSideNow()}
                            // onHide={() => updateSideBarState(false)}
                            vertical
                            visible={visible}
                            width="thin"
                        >
                            <div style={{marginTop: "50px"}}/>
                            <Menu.Item as="a" onClick={() => setProject("")}>
                                <Icon name="search"/>
                                Search
                            </Menu.Item>
                            {projectList.map(p => (
                                <Menu.Item key={p} as="a" onClick={() => setProject(p)}>
                                    {p}
                                </Menu.Item>
                            ))}
                            <Menu.Item as="a" onClick={() => setProject("")}>
                                <Icon name="arrow left"/>
                                Go Back
                            </Menu.Item>
                        </Sidebar>
                    )}
                </Sidebar.Pushable>
*/}
                <HeaderComponent night={_nm => this.setState({nm: _nm})}/>
            </div>
        );
    }

    getPlaceHolders() {
        return (
            <Spinner marginX="auto" marginY={120}/>
        );
    }
}
