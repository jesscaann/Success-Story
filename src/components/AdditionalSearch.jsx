import React, { Component } from "react";
import { Form, Button, Menu } from "semantic-ui-react";

class AdditionalSearch extends Component {
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

  removeAdditionalFilters = e => {
    e.preventDefault();
    this.props.clearAdditional();
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
          <Button onClick={this.removeAdditionalFilters}>
            Remove Additional Filters
          </Button>
          <Button onClick={this.saveAndContinue}>Search </Button>
        </Form>
      </div>
    );
  }
}

export default AdditionalSearch;
