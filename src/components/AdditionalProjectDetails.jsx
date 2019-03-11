import React, { Component } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { throws } from "assert";

class AdditionalProjectDetails extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <Form>
        <h1 className="ui centered">Additional Project Details</h1>
        <Form.Group widths="equal">
          <Form.Dropdown
            fluid
            selection
            placeholder="Engagement Model"
            defaultValue={values.engagementModel}
            onChange={this.props.handleChange("engagementModel")}
            options={[
              {
                key: "StaffAug.(LVL1)",
                text: "Staff Aug. (LVL 1)",
                value: "StaffAug.(LVL1)"
              },
              {
                key: "MngdCap/T&M(LVL2)",
                text: "Managed Capacity/T&M (LVL 2)",
                value: "MngdCap/T&M(LVL2)"
              },
              {
                key: "Proj/Out(LVL3)",
                text: "Projects/Outcome (LVL 3)",
                value: "Proj/Out(LVL3)"
              },
              {
                key: "MngdServ(LVL4)",
                text: "Mangaged Service (LVL 4)",
                value: "MngdServ(LVL4)"
              }
            ]}
          />
          <Form.Dropdown
            fluid
            selection
            placeholder="Staffing Model"
            onChange={this.props.handleChange("staffingModel")}
            defaultValue={values.staffingModel}
            options={[
              { key: "Onshore", text: "Onshore", value: "Onshore" },
              { key: "Offshore", text: "Offshore", value: "Offshore" },
              { key: "RightShore", text: "RightShore", value: "RightShore" }
            ]}
          />
          <Form.Field>
            <input
              placeholder="Size of Engagement"
              onChange={this.props.handleChange("sizeOfEngagement")}
              defaultValue={values.sizeOfEngagement}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Duration Of Engagement"
              onChange={this.props.handleChange("durationOfEngagement")}
              defaultValue={values.durationOfEngagement}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Engagement Value"
              onChange={this.props.handleChange("engagementValue")}
              defaultValue={values.engagementValue}
            />
          </Form.Field>
        </Form.Group>
        <Button onClick={this.back}>Previous</Button>
        <Button onClick={this.saveAndContinue}>Submit for Review </Button>
      </Form>
    );
  }
}

export default AdditionalProjectDetails;
