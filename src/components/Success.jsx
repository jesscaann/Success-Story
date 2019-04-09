import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class Success extends Component {
  handleMenu = e => {
    e.preventDefault();
    this.props.clear();
    this.props.handleMainMenu();
  };

  handleDetails = e => {
    e.preventDefault();
    this.props.clear();
    this.props.handleEnterDetails();
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.clear();
    this.props.handleEnterSearch();
  };

  render() {
    return (
      <div>
        <Menu>
          <Menu.Item name="1" onClick={this.handleMenu}>
            Home
          </Menu.Item>

          <Menu.Item name="2" onClick={this.handleDetails}>
            Enter Details
          </Menu.Item>

          <Menu.Item name="9" onClick={this.handleSearch}>
            Search
          </Menu.Item>
        </Menu>

        <h1 className="ui centered">Details Successfully Saved</h1>
      </div>
    );
  }
}

export default Success;
