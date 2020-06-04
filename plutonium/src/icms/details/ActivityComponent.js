import React, {Component} from "react";
import {
    Menu,
    Segment,
    Comment,
    Header,
    Form,
    Button,
    Icon
} from "semantic-ui-react";

export default class ActivityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLast: 3,
            activeTab: "comments"
        };
    }

    render() {
        const aT = this.state.activeTab;
        const comments = this.props.comments.slice(
            this.props.comments.length - this.state.showLast
        );
        const updateTab = tabName => {
            this.setState({activeTab: tabName});
        };
        const displayDate = d =>
            new Date(parseInt(d)).toLocaleString("en-IN", {timeZone: "UTC"});
        const getPrfileUrl = _comment => {
            return (
                "https://randomuser.me/api/portraits/women/" +
                _comment.profile_photo +
                ".jpg"
            );
        };

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item
                        name="comments"
                        active={aT === "comments"}
                        content={
                            <span>
                <Icon name="comments"/> Comments
              </span>
                        }
                        onClick={() => updateTab("comments")}
                    />
                    <Menu.Item
                        name="attachments"
                        active={aT === "attachments"}
                        content={
                            <span>
                <Icon name="paperclip"/> Attachments
              </span>
                        }
                        onClick={() => updateTab("attachments")}
                    />
                    <Menu.Item
                        name="audit"
                        active={aT === "audit"}
                        content={
                            <span>
                <Icon name="history"/> History
              </span>
                        }
                        onClick={() => updateTab("audit")}
                    />
                </Menu>

                <Segment basic>
                    <Comment.Group threaded>
                        {comments.map(c => (
                            <Comment key={"c" + c.comment_on + "-" + c.comment_by}>
                                <Comment.Avatar as="a" src={getPrfileUrl(c)}/>
                                <Comment.Content>
                                    <Comment.Author as="a"> {c.comment_by} </Comment.Author>
                                    <Comment.Metadata>
                                        <span> {displayDate(c.comment_on)} </span>
                                    </Comment.Metadata>
                                    <Comment.Text>{c.message}</Comment.Text>
                                    <Comment.Actions>
                                        <a>Reply</a>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        ))}

                        <Comment>
                            <Comment.Avatar
                                as="a"
                                src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                            />
                            <Comment.Content>
                                <Comment.Author as="a">Elliot Fu</Comment.Author>
                                <Comment.Metadata>
                                    <span>Yesterday at 12:30AM</span>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>
                                        This has been very useful for my research. Thanks as well!
                                    </p>
                                </Comment.Text>
                                <Comment.Actions>
                                    <a>Reply</a>
                                </Comment.Actions>
                            </Comment.Content>

                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar
                                        as="a"
                                        src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                                    />
                                    <Comment.Content>
                                        <Comment.Author as="a">Jenny Hess</Comment.Author>
                                        <Comment.Metadata>
                                            <span>Just now</span>
                                        </Comment.Metadata>
                                        <Comment.Text>
                                            Elliot you are always so right :)
                                        </Comment.Text>
                                        <Comment.Actions>
                                            <a>Reply</a>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </Comment>

                        <Form reply>
                            <Form.TextArea/>
                            <Button
                                labelPosition="left"
                                content="Add Comment"
                                icon="edit"
                                primary
                                onClick={() => {
                                }}
                            />
                        </Form>
                    </Comment.Group>
                </Segment>
            </div>
        );
    }
}
