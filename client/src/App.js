import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Message from "./Message";
import UrlForm from "./components/input/UrlForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>GoList</h1>
          <Router>
            <Route path="/:id" component={Message} />
          </Router>
        </header>
        <UrlForm />
      </div>
    );
  }
}

export default App;
