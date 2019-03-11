import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

class ProjectDetails extends Component {
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
        <h1 className="ui centered">Project Details</h1>
        <Form.Group widths="equal">
          <Form.Dropdown
            fluid
            multiple
            selection
            placeholder="Industry"
             onChange={this.props.handleChange("industry")}
            defaultValue={values.industry}
            options={[
              {
                key: "Aero&Def",
                text: "Aerospace & Defense",
                value: "Aero&Def"
              },
              {
                key: "Agric,Autom",
                text: "Agriculture, Automotive",
                value: "Agric,Auto"
              },
              {
                key: "Bank&CapMarkets",
                text: "Banking & Capital Markets",
                value: "Bank&CapMarkets"
              },
              {
                key: "ConsumerProd",
                text: "Consumer Products",
                value: "ConsumerProd"
              },
              {
                key: "Elect&HTech",
                text: "Electronics & High Tech",
                value: "Elect&HTech"
              },
              {
                key: "Energy&Util",
                text: "Energy & Utilities",
                value: "Energy&Util"
              },
              {
                key: "Gov&PublicSect",
                text: "Government & Public Sector",
                value: "Gov&PublicSect"
              },
              {
                key: "Health&LifeSci",
                text: "Healthcare & Life Sciences",
                value: "Health&LifeSci"
              },
              { key: "Insur", text: "Insurance", value: "Insur" },
              {
                key: "Manuf&IndustProd",
                text: "Manufacturing & Industrial Products",
                value: "Manuf&IndustProd"
              },
              {
                key: "Media&Entert",
                text: "Media & Entertainment",
                value: "Media&Entert"
              },
              { key: "NatResour", text: "Natural Resources", value: "atResour" }
            ]}
          />

          <Form.Dropdown
            fluid
            multiple
            selection
            placeholder="Technology"
            onChange={this.props.handleChange("technology")}
            defaultValue={values.technology}
            options={[
              { key: ".NET", text: ".NET", value: ".NET" },
              { key: "jScript", text: "jScript", value: "jScript" },
              { key: "SQLDB", text: "SQL Database", value: "SQLDB" },
              {
                key: "Non-SQLDB",
                text: "Non-SQL Database",
                value: "Non-SQLDB"
              },
              {
                key: "RestfulAPIs",
                text: "Restful APIs",
                value: "RestfulAPIs"
              },
              { key: "Azure", text: "Azure", value: "Azure" },
              { key: "AWS", text: "AWS", value: "AWS" },
              { key: "GCS", text: "GCS", value: "GCS" },
              { key: "Selenium", text: "Selenium", value: "Selenium" },
              { key: "Specflow", text: "Specflow", value: "Specflow" },
              { key: "HP", text: "HP", value: "HP" }
            ]}
          />
          <Form.Dropdown
            fluid
            multiple
            selection
            placeholder="Practice"
            onChange={this.props.handleChange("practice")}
            defaultValue={values.practice}
            options={[
              { key: "ACT-dev", text: "ACT-dev", value: "ACT-dev" },
              { key: "ACT-PMBA", text: "ACT-PMBA", value: "ACT-PMBA" },
              {
                key: "Test&Ana",
                text: "Testing & Analytics",
                value: "Test&Ana"
              },
              {
                key: "DigTrans",
                text: "Digital Transformation",
                value: "DigTrans"
              },
              {
                key: "Insight&Data",
                text: "Insights & Data",
                value: "Insight&Data"
              }
            ]}
          />
        </Form.Group>
        <Button onClick={this.back}>Previous</Button>
        <Button onClick={this.saveAndContinue}>Enter Additional Details</Button>
      </Form>
    );
  }
}

export default ProjectDetails;
