import React, {Component} from "react";
import {Box, Flex, IconButton, Image} from "@chakra-ui/core";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {nm: false};
    }

    render() {
        const toggleNightMode = () => {
            this.setState({nm: !this.state.nm}, () => {
                // this.props.night(this.state.nm);
            });
        };

        return (
            <Box pos={"fixed"} width={"full"} height={"80px"} top={"0"}>
                <Flex size={"100%"} align={"center"}>
                    <Flex align={"left"}>
                        <Image
                            src="https://github.com/MrL1605/demo/raw/master/assets/clari5_logo.png"
                            alt="Clari5 Logo"
                            htmlHeight={"60px"}
                            onClick={() => {
                                window.location.reload();
                            }}
                        />
                    </Flex>
                    <Flex align={"right"}>
                        {(this.state.nm &&
                            <IconButton icon={"moon"} onClick={() => toggleNightMode()}/>
                        ) || (
                            <IconButton icon={"sun"} onClick={() => toggleNightMode()} variant={"ghost"}/>
                        )}
                    </Flex>
                </Flex>
            </Box>
            /*
                        <Menu color="blue" inverted className="fixed" style={{zIndex: 100}}>
                            <Menu.Menu position="right">
                                <Menu.Item name="theme" onClick={toggleNightMode}>
                                    {(this.state.nm && (
                                        <span>
                            <Icon name="moon"/> Dark
                          </span>
                                    )) || (
                                        <span>
                            <Icon name="sun"/> Light
                          </span>
                                    )}
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
            */
        );
    }
}
