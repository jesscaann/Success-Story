import React, { Component } from "react";
import { Form, Button, Menu } from "semantic-ui-react";
import DataHandler from "../api/dataHandler";

class AdditionalProjectDetails extends Component {
  state = { engagementModelLevels: [], staffingModels: [] };
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

  componentDidMount() {
    this.setState({
      engagementModelLevels: new DataHandler().get("engagementModelLevels")
    });
    this.setState({
      staffingModels: new DataHandler().get("staffingDeliveryModels")
    });
  }
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
              defaultValue={values.engagementModellevel}
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "engagementModelLevel"
                });
              }}
              options={this.state.engagementModelLevels}
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
              options={this.state.staffingModels}
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
