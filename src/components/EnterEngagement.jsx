import React, { Component } from "react";
import { Form, Button, Menu } from "semantic-ui-react";

class EnterEngagement extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  canBeSubmitted() {
    const { values } = this.props;
    return values.clientName.length > 0 && values.engagementName.length > 0;
  }

  handleMenu = e => {
    e.preventDefault();
    this.props.handleMainMenu();
  };

  handleDetails = e => {
    e.preventDefault();
    this.props.handleEnterDetails();
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.handleEnterSearch();
  };

  render() {
    const { values } = this.props;
    const isEnabled = this.canBeSubmitted();
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

        <Form>
          <h1 className="ui centered">Select Engagement Details</h1>
          <Form.Group widths="equal">
            <Form.Dropdown
              fluid
              selection
              placeholder="Client Name"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "clientName"
                });
              }}
              defaultValue={values.clientName}
              options={[
                {
                  key: "BCBS",
                  text: "BCBS",
                  value: "BCBS "
                },
                {
                  key: "Medtronic",
                  text: "Medtronic",
                  value: "Medtronic "
                },
                {
                  key: "Thomson Reuters",
                  text: "Thomson Reuters",
                  value: "Thomson Reuters "
                }
              ]}
            />

            <Form.Dropdown
              fluid
              selection
              placeholder="Engagement Name"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "engagementName"
                });
              }}
              defaultValue={values.engagementName}
              options={[
                {
                  key: "Discov&CloudMigrRead",
                  text: "Discovery & Cloud Migration Readiness",
                  value: "Discovery & Cloud Migration Readiness "
                },
                {
                  key: "EngageName2",
                  text: "Engagement Name 2",
                  value: "Engagement Name 2 "
                },
                {
                  key: "EngageName3",
                  text: "Engagement Name 3",
                  value: "Engagement Name 3 "
                },
                {
                  key: "EngageName4",
                  text: "Engagement Name 4",
                  value: "Engagement Name 4 "
                }
              ]}
            />
          </Form.Group>
          <Button disabled={!isEnabled} onClick={this.saveAndContinue}>
            {" "}
            Continue
          </Button>
        </Form>
      </div>
    );
  }
}

export default EnterEngagement;
