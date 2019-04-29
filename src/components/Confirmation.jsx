import React, { Component } from "react";
import { Header, Button, List, Table, Menu } from "semantic-ui-react";
import DataHandler from "../api/dataHandler";
import Storage from "../api/Storage";

class Confirmation extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    new DataHandler().submitCaseStudy(this.props.values);
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
    const {
      values: {
        clientName,
        engagementName,
        businessProblem,
        solutionDescription,
        resultsAchieved,
        industry,
        technology,
        practice,
        engagementModelLevel,
        staffingModel,
        sizeOfEngagement,
        durationOfEngagement,
        engagementValue
      }
    } = this.props;

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

        <Header size="huge"> Engagement Details </Header>
        <Header size="medium">Engagement Name:</Header>
        <List.Content>{engagementName}</List.Content>
        <br />
        <Header size="medium">Client Name:</Header>
        <List.Content>{clientName}</List.Content>
        <br />
        <Header size="small">Business Challenge:</Header>
        <List.Content>{businessProblem}</List.Content>
        <br />
        <Header size="small">Solution:</Header>
        <List.Content>{solutionDescription}</List.Content>
        <br />
        <Header size="small">Results Achieved:</Header>
        <List.Content>{resultsAchieved}</List.Content>
        <br />

        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Industry</Table.Cell>
              <Table.Cell>
                {" "}
                <List.Content>{industry}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Technology</Table.Cell>
              <Table.Cell>
                {" "}
                <List.Content> {technology.join(", ")}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Practice</Table.Cell>
              <Table.Cell>
                <List.Content>{practice}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Engagement Model</Table.Cell>
              <Table.Cell>
                <List.Content>{engagementModelLevel}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Staffing Model</Table.Cell>
              <Table.Cell>
                <List.Content>{staffingModel}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Size Of Engagement</Table.Cell>
              <Table.Cell>
                <List.Content>{sizeOfEngagement}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Duration Of Engagement</Table.Cell>
              <Table.Cell>
                <List.Content>{durationOfEngagement}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Engagement Value</Table.Cell>
              <Table.Cell>
                <List.Content> $ {engagementValue}</List.Content>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button onClick={this.back}>Previous</Button>
        <Button onClick={this.saveAndContinue}>Submit</Button>
      </div>
    );
  }
}

export default Confirmation;
