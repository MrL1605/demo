import React, {Component, createRef} from "react";
import {
    Sidebar,
    Menu,
    Segment,
    Dimmer,
    Loader,
    Placeholder,
    Icon,
    Button,
    Rail,
    Grid,
    Ref,
    Sticky,
    Header,
    Container,
    Popup
} from "semantic-ui-react";
import {DB} from "../API";
import ListIssues from "./ListIssues";
import HeaderComponent from "./HeaderComponent";

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
        this.listContentRef = createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            let projects = DB.projects;
            if (projects)
                this.setState({projectList: projects, project: projects[0]});
        }, 1000);
    }

    render() {
        const removeSideNow = () => {
            this.setState({removeSidebar: true});
        };
        const updateSideBarState = visibility => {
            if (visibility !== this.state.visible)
                if (visibility) this.setState({visible: true, removeSidebar: false});
                else this.setState({visible: false});
        };
        const setProject = p => {
            if (p) this.setState({project: p, visible: false});
            else this.setState({visible: false});
        };
        const {projectList, project, visible, removeSidebar} = this.state;

        return (
            <div style={{height: "100%", position: "relative"}}>
                <Segment
                    basic
                    inverted={this.state.nm}
                    style={{position: "absolute", width: "100%", marginBottom: "0"}}
                >
                    <div style={{marginTop: "65px"}}/>
                    {/* {sticker()} */}
                    {(project && <ListIssues project={project} nm={this.state.nm}/>) ||
                    this.getPlaceHolders()}
                </Segment>

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
                                {/* <span className="text">Projects</span> */}
                            </Button>
                        }
                    />
                </div>

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

                    {/* <Sidebar.Pusher dimmed={visible}>
            <Segment basic />
          </Sidebar.Pusher> */}
                </Sidebar.Pushable>
                <HeaderComponent night={_nm => this.setState({nm: _nm})}/>
            </div>
        );
    }

    getPlaceHolders() {
        return (
            <Container>
                <Segment
                    basic
                    padded="very"
                    style={{height: "100vh", zIndex: 10}}
                    inverted={this.state.nm}
                >
                    <Placeholder style={{margin: "30px 0 0 20%"}}>
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
                        <Placeholder.Line/>
                        <Placeholder.Header>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Paragraph>
                        <Placeholder.Header>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Paragraph>
                        <Placeholder.Header>
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
                </Segment>
            </Container>
        );
    }
}
