import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

class EnterEngagement extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <Form>
        <h1 className="ui centered">Select Engagement Details</h1>
        <Form.Group widths="equal">
          <Form.Dropdown
            fluid
            selection
            placeholder="Client Name"
            onChange={this.props.handleChange("industry")}
            defaultValue={values.clientName}
            options={[
              {
                key: "BCBS",
                text: "BCBS",
                value: "BCBS"
              },
              {
                key: "Medtronic",
                text: "Medtronic",
                value: "Medtronic"
              },
              {
                key: "Thomson Reuters",
                text: "Thomson Reuterss",
                value: "Thomson Reuters"
              }
            ]}
          />

          <Form.Dropdown
            fluid
            selection
            placeholder="Engagement Name"
            onChange={this.props.handleChange("technology")}
            defaultValue={values.engagementName}
            options={[
              {
                key: "Discov&CloudMigrRead",
                text: "Discovery & Cloud Migration Readiness",
                value: "Discov&CloudMigrRead"
              },
              {
                key: "EngageName2",
                text: "Engagement Name 2",
                value: "EngageName2"
              },
              {
                key: "EngageName3",
                text: "Engagement Name 3",
                value: "EngageName3"
              },
              {
                key: "EngageName4",
                text: "Engagement Name 4",
                value: "EngageName4"
              }
            ]}
          />
        </Form.Group>
        <Button onClick={this.saveAndContinue}> Continue</Button>
      </Form>
    );
  }
}

export default EnterEngagement;
