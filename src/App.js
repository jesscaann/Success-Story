import React, { Component } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import { Container } from "semantic-ui-react";
import DataHandler from "./api/dataHandler";

class App extends Component {
  componentDidMount() {
    new DataHandler();
  }
  render() {
    return (
      <Container textAlign="left">
        <MainForm />
      </Container>
    );
  }
}

export default App;
