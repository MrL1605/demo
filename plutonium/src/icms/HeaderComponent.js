import React, {Component} from "react";
import {Image, Menu, Icon} from "semantic-ui-react";

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
            <Menu color="blue" inverted className="fixed" style={{zIndex: 100}}>
                <Image
                    src="https://github.com/MrL1605/demo/raw/master/assets/clari5_logo.png"
                    alt="Clari5 Logo"
                    size="small"
                    verticalAlign="middle"
                    bordered
                    onClick={() => {
                        window.location.reload();
                    }}
                />

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
        );
    }
}
