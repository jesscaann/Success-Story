import React, { Component } from "react";
import { Header, Button, List, Table, Menu } from "semantic-ui-react";

class SearchResults extends Component {
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
    this.props.clear();
  };

  handleDetails = e => {
    e.preventDefault();
    this.props.handleEnterDetails();
    this.props.clear();
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.handleEnterSearch();
    this.props.clear();
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
        <Header size="huge"> Project Matches </Header>
        <Header size="small">
          This list of projects matches your filter criteria
        </Header>
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Engagement</Table.Cell>
              <Table.Cell>Business Challenge</Table.Cell>
              <Table.Cell>Industry</Table.Cell>
              <Table.Cell>Technology</Table.Cell>
              <Table.Cell>Practice</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
              <Table.Cell>
                <List.Content>{}</List.Content>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default SearchResults;
