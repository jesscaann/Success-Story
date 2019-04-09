import React, { Component } from "react";
import { Form, Button, Menu } from "semantic-ui-react";
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
          <h1 className="ui centered">Additional Project Details</h1>
          <Form.Group widths="equal">
            <Form.Dropdown
              fluid
              selection
              placeholder="Engagement Model"
              defaultValue={values.engagementModel}
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "engagementModel"
                });
              }}
              options={[
                {
                  key: "StaffAug.(LVL1)",
                  text: "Staff Aug. (LVL 1)",
                  value: "Staff Aug.(LVL 1) "
                },
                {
                  key: "MngdCap/T&M(LVL2)",
                  text: "Managed Capacity/T&M (LVL 2)",
                  value: "Managed Capacity/T&M (LVL 2) "
                },
                {
                  key: "Proj/Out(LVL3)",
                  text: "Projects/Outcome (LVL 3)",
                  value: "Projects/Outcome (LVL 3) "
                },
                {
                  key: "MngdServ(LVL4)",
                  text: "Mangaged Service (LVL 4)",
                  value: "MMangaged Service (LVL 4) "
                }
              ]}
            />
            <Form.Dropdown
              fluid
              selection
              placeholder="Staffing Model"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "staffingModel"
                });
              }}
              defaultValue={values.staffingModel}
              options={[
                { key: "Onshore", text: "Onshore", value: "Onshore " },
                { key: "Offshore", text: "Offshore", value: "Offshore " },
                { key: "RightShore", text: "RightShore", value: "RightShore " }
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
      </div>
    );
  }
}

export default AdditionalProjectDetails;
