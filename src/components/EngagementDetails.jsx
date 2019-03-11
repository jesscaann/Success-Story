import React, { Component } from "react";
import { Form, Button, Header } from "semantic-ui-react";
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
    );
  }
}

export default AdditionalProjectDetails;
