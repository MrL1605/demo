import React, {Component, createRef} from "react";
import {DB} from "../API";
import HeaderComponent from "./HeaderComponent";
import {Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Skeleton} from "@chakra-ui/core";

export default class GenesisComponent extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            removeSidebar: true,
            project: "",
            projectList: [],
            nm: false
        };
        this.sideBarRef = createRef();
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
            if (visibility !== this.state.visible)
                if (visibility) this.setState({visible: true});
                else this.setState({visible: false});
        };
        const setProject = p => {
            if (p) this.setState({project: p, visible: false});
            else this.setState({visible: false});
        };
        const {projectList, project, visible} = this.state;

        return (
            <div>
                {/*
                <Segment
                    basic
                    inverted={this.state.nm}
                    style={{position: "absolute", width: "100%", marginBottom: "0"}}
                >
                    <div style={{marginTop: "65px"}}/>
                    {(project && <ListIssues project={project} nm={this.state.nm}/>) ||
                    this.getPlaceHolders()}
                </Segment>
*/}

                {/*
                <div style={{position: "fixed"}}>
                    <Popup
                        content="Project List"
                        position="bottom left"
                        trigger={
                            <Button
                                size="big"
                                color={this.state.nm ? "white" : "black"}
                                floated="left"
                                attached="right"
                                style={{marginTop: "100px", zIndex: 20}}
                                onClick={() => updateSideBarState(true)}
                                data-content="Project List"
                            >
                                <Icon name="content"/>
                            </Button>
                        }
                    />
                </div>
*/}

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
                <Box marginTop={"60px"}>
                    <Button ref={this.sideBarRef} onClick={() => updateSideBarState(!visible)}>Open SideBar</Button>
                </Box>
                <Drawer finalFocusRef={this.sideBarRef} placement={"left"}
                        isOpen={visible}>
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerHeader>Projects</DrawerHeader>
                        {projectList.length && (
                            <DrawerBody>
                                {projectList.map(p => (
                                    <div key={p} onClick={() => setProject(p)}>
                                        {p}
                                    </div>
                                ))}
                            </DrawerBody>
                        )}
                    </DrawerContent>
                </Drawer>
                {this.getPlaceHolders()}
                <HeaderComponent/>
            </div>
        );
    }

    getPlaceHolders() {
        return (
            <div>
                <Box p={6}
                     borderWidth={"2px"}
                     rounded={"lg"}
                     height={"100vh"}>
                    <Skeleton height="20px" my="10px"/>
                    <Skeleton height="20px" my="10px"/>
                    <Skeleton height="20px" my="10px"/>
                    <Skeleton height="20px" my="10px"/>
                    <Skeleton height="20px" my="10px"/>
                    <Skeleton height="20px" my="10px"/>
                    <Skeleton height="20px" my="10px"/>
                </Box>
            </div>
        );
    }
}
