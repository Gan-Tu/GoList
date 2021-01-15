import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Listing from "./components/Listing";
import UrlForm from "./components/input/UrlForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>GoList</h1>
        </header>
        <Router>
          <Route exact path="/" component={UrlForm} />
          <Route path="/:id" component={Listing} />
        </Router>
      </div>
    );
  }
}

export default App;
