import React, { Component } from "react";
import { Form, Button, Header, Menu } from "semantic-ui-react";
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

          <Menu.Item name="Search" onClick={this.handleSearch}>
            Search
          </Menu.Item>
        </Menu>

        <Form>
          <h1 className="ui centered">Enter Engagement Details</h1>

          <Form.Field>
            <label> Business Problem: </label>
            <input
              placeholder="Business Problem"
              onChange={this.props.handleChange("businessProblem")}
              defaultValue={values.businessProblem}
            />
          </Form.Field>
          <Form.Field>
            <label> Solution Description:</label>
            <input
              placeholder="Solution Description"
              onChange={this.props.handleChange("solutionDescription")}
              defaultValue={values.solutionDescription}
            />
          </Form.Field>
          <Form.Field>
            <label> Results Achieved:</label>
            <input
              placeholder="Results Achieved"
              onChange={this.props.handleChange("resultsAchieved")}
              defaultValue={values.resultsAchieved}
            />
          </Form.Field>

          <Button onClick={this.back}>Previous</Button>
          <Button onClick={this.saveAndContinue}> Continue </Button>
        </Form>
      </div>
    );
  }
}

export default AdditionalProjectDetails;
