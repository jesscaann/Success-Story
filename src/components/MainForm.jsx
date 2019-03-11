import React, { Component } from "react";
import ProjectDetails from "./ProjectDetails";
import AdditionalProjectDetails from "./AdditionalProjectDetails";
import EnterEngagement from "./EnterEngagement";
import EngagementDetails from "./EngagementDetails.jsx";
import Confirmation from "./Confirmation";
import Success from "./Success";
//
class MainForm extends Component {
  state = {
    step: 1,
    clientName: "",
    engagementName: "",
    businessProblem: "",
    solutionDescription: "",
    resultsAchieved: "",
    industry: "",
    technology: "",
    practice: "",
    engagementModel: "",
    staffingModel: "",
    sizeOfEngagement: "",
    durationOfEngagement: "",
    engagementValue: ""
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleDropdown = ({ value, input }) => {
    this.setState({ [input]: value });
  };

  render() {
    const { step } = this.state;
    const {
      clientName,
      engagementName,
      businessProblem,
      solutionDescription,
      resultsAchieved,
      industry,
      technology,
      practice,
      engagementModel,
      staffingModel,
      sizeOfEngagement,
      durationOfEngagement,
      engagementValue
    } = this.state;
    const values = {
      clientName,
      engagementName,
      businessProblem,
      solutionDescription,
      resultsAchieved,
      industry,
      technology,
      practice,
      engagementModel,
      staffingModel,
      sizeOfEngagement,
      durationOfEngagement,
      engagementValue
    };
    switch (step) {
      case 1:
        return (
          <EnterEngagement
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            values={values}
          />
        );
      case 2:
        return (
          <EngagementDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            values={values}
          />
        );
      case 3:
        return (
          <ProjectDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            values={values}
          />
        );
      case 4:
        return (
          <AdditionalProjectDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            values={values}
          />
        );
      case 5:
        return (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 6:
        return <Success />;
    }
  }
}

export default MainForm;
