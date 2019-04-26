import React, { Component } from "react";
import { Form, Button, Menu } from "semantic-ui-react";
import DATA from "../api/data";

class ProjectDetails extends Component {
  state = { industries: [], technologies: [], practices: [] };
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

  canBeSubmitted() {
    const { values } = this.props;
    return (
      values.industry.length > 0 &&
      values.technology.length > 0 &&
      values.practice.length > 0
    );
  }

  componentDidMount() {
    this.setState({
      industries: new DATA().get("industries"),
      technologies: new DATA().get("technologies"),
      practices: new DATA().get("practices")
    });
  }

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
          <h1 className="ui centered">Project Details</h1>
          <Form.Group widths="equal">
            <Form.Dropdown
              fluid
              selection
              placeholder="Industry"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "industry"
                });
              }}
              defaultValue={values.industry}
              options={this.state.industries}
            />

            <Form.Dropdown
              fluid
              multiple
              selection
              placeholder="Technology"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "technology"
                });
              }}
              defaultValue={values.technology}
              options={this.state.technologies}
            />
            <Form.Dropdown
              fluid
              selection
              placeholder="Practice"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "practice"
                });
              }}
              defaultValue={values.practice}
              options={this.state.practices}
            />
          </Form.Group>
          <Button onClick={this.back}>Previous</Button>
          <Button disabled={!isEnabled} onClick={this.saveAndContinue}>
            Enter Additional Details
          </Button>
        </Form>
      </div>
    );
  }
}

export default ProjectDetails;
