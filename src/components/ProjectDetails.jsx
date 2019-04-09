import React, { Component } from "react";
import { Form, Button, Menu } from "semantic-ui-react";

class ProjectDetails extends Component {
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
              multiple
              selection
              placeholder="Industry"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "industry"
                });
              }}
              defaultValue={values.industry}
              options={[
                {
                  key: "Aero&Def",
                  text: "Aerospace & Defense",
                  value: "Aerospace & Defense "
                },
                {
                  key: "Agric,Autom",
                  text: "Agriculture, Automotive",
                  value: " Agriculture, Automotive "
                },
                {
                  key: "Bank&CapMarkets",
                  text: "Banking & Capital Markets",
                  value: "Banking & Capital Markets "
                },
                {
                  key: "ConsumerProd",
                  text: "Consumer Products",
                  value: "Consumer Products "
                },
                {
                  key: "Elect&HTech",
                  text: "Electronics & High Tech",
                  value: "Electronics & High Tech "
                },
                {
                  key: "Energy&Util",
                  text: "Energy & Utilities",
                  value: "Energy & Utilities "
                },
                {
                  key: "Gov&PublicSect",
                  text: "Government & Public Sector",
                  value: "Government & Public Sector "
                },
                {
                  key: "Health&LifeSci",
                  text: "Healthcare & Life Sciences",
                  value: "Healthcare & Life Sciences "
                },
                { key: "Insur", text: "Insurance", value: "Insurance " },
                {
                  key: "Manuf&IndustProd",
                  text: "Manufacturing & Industrial Products",
                  value: "Manufacturing & Industrial Products "
                },
                {
                  key: "Media&Entert",
                  text: "Media & Entertainment",
                  value: "Media & Entertainment "
                },
                {
                  key: "NatResour",
                  text: "Natural Resources",
                  value: "Natural Resources "
                }
              ]}
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
              options={[
                { key: ".NET", text: ".NET", value: ".NET " },
                { key: "jScript", text: "jScript", value: "jScript " },
                { key: "SQLDB", text: "SQL Database", value: "SQL Database " },
                {
                  key: "Non-SQLDB",
                  text: "Non-SQL Database",
                  value: "Non-SQL Database"
                },
                {
                  key: "RestfulAPIs",
                  text: "Restful APIs",
                  value: "Restful APIs "
                },
                { key: "Azure", text: "Azure", value: "Azure " },
                { key: "AWS", text: "AWS", value: "AWS " },
                { key: "GCS", text: "GCS", value: "GCS " },
                { key: "Selenium", text: "Selenium", value: "Selenium " },
                { key: "Specflow", text: "Specflow", value: "Specflow " },
                { key: "HP", text: "HP", value: "HP " }
              ]}
            />
            <Form.Dropdown
              fluid
              multiple
              selection
              placeholder="Practice"
              onChange={(e, { value }) => {
                this.props.handleDropdown({
                  value: value,
                  input: "practice"
                });
              }}
              defaultValue={values.practice}
              options={[
                { key: "ACT-dev", text: "ACT-dev", value: "ACT-dev " },
                { key: "ACT-PMBA", text: "ACT-PMBA", value: "ACT-PMBA " },
                {
                  key: "Test&Ana",
                  text: "Testing & Analytics",
                  value: "Testing & Analytics "
                },
                {
                  key: "DigTrans",
                  text: "Digital Transformation",
                  value: "Digital Transformation "
                },
                {
                  key: "Insight&Data",
                  text: "Insights & Data",
                  value: "Insights & Data "
                }
              ]}
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
