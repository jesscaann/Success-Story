import React, { Component } from "react";
import MainMenu from "./MainMenu";
import ProjectDetails from "./ProjectDetails";
import AdditionalProjectDetails from "./AdditionalProjectDetails";
import EnterEngagement from "./EnterEngagement";
import EngagementDetails from "./EngagementDetails.jsx";
import Confirmation from "./Confirmation";
import Success from "./Success";
import SearchPage from "./SearchPage";
import AdditionalSearch from "./AdditionalSearch";
import SearchResults from "./SearchResults";
import CaseStudyResult from "./CaseStudyResult";
import DataHandler from "../api/dataHandler";

class MainForm extends Component {
  state = {
    step: 1,
    clientName: "", //id
    engagementName: "", //id
    businessProblem: "",
    solutionDescription: "",
    resultsAchieved: "",
    industry: "", //id
    technology: "", //id
    practice: "", //id
    engagementModel: "", //id
    staffingModel: "", //id
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

  handleMainMenu = () => {
    this.setState({
      step: 1
    });
  };

  handleEnterDetails = () => {
    this.setState({
      step: 2
    });
  };

  handleEnterSearch = () => {
    this.setState({
      step: 9
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  // handleDropdown = ({ value, input }) => {
  //   this.setState({ [input]: value });
  // };
  handleDropdown = choice => {
    this.setState({ [choice.input]: choice.value });
  };

  clearAdditional = () => {
    this.setState({
      clientName: "",
      staffingModel: "",
      sizeOfEngagement: "",
      durationOfEngagement: "",
      engagementValue: ""
    });
  };

  clear = () => {
    this.setState({
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
    });
  };

  componentDidMount() {
    new DataHandler();
  }
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
          <MainMenu
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
      case 2:
        return (
          <EnterEngagement
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
      case 3:
        return (
          <EngagementDetails
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
      case 4:
        return (
          <ProjectDetails
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
      case 5:
        return (
          <AdditionalProjectDetails
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
      case 6:
        return (
          <Confirmation
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            clear={this.clear}
            values={values}
          />
        );
      case 7:
        return (
          <Success
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleSearch={this.handleSearch}
            clear={this.clear}
          />
        );

      case 8:
        return (
          <AdditionalSearch
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            clearAdditional={this.clearAdditional}
            values={values}
          />
        );

      case 9:
        return (
          <SearchPage
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );

      case 10:
        return (
          <SearchResults
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
      case 11:
        return (
          <CaseStudyResult
            handleMainMenu={this.handleMainMenu}
            handleEnterDetails={this.handleEnterDetails}
            handleEnterSearch={this.handleEnterSearch}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDropdown={this.handleDropdown}
            clear={this.clear}
            values={values}
          />
        );
    }
  }
}

export default MainForm;
