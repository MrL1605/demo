import React, {Component} from "react";
import {IconButton, Image, majorScale, minorScale, Pane} from "evergreen-ui";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {nm: false};
    }

    render() {
        const toggleNightMode = () => {
            this.setState({nm: !this.state.nm}, () => {
                this.props.night(this.state.nm);
            });
        };

        return (
            <Pane height={minorScale(17)} elevation={3} display={"flex"}
                  background={"blueTint"}>
                {/* style={{position: "fixed", top: "0"}}>*/}
                <Pane display="flex" flex={1}>
                    <Image src="https://github.com/MrL1605/demo/raw/master/assets/clari5_logo.png"
                           alt="Clari5 Logo"
                           height={majorScale(8)}
                           alignItems="center"
                           onClick={() => {
                               window.location.reload();
                           }}
                    />
                </Pane>
                <Pane padding={majorScale(2)}>
                    {(this.state.nm && (
                        <IconButton appearance={"minimal"} height={majorScale(5)} marginRight={minorScale(3)}
                                    icon={"moon"} onClick={toggleNightMode}/>
                    ) || (
                        <IconButton appearance={"minimal"} height={majorScale(5)} marginRight={minorScale(3)}
                                    icon={"contrast"} onClick={toggleNightMode}/>
                    ))}
                </Pane>
            </Pane>
        );
    }
}
