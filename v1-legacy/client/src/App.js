import React, { Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import Listing from "./components/Listing";
import UrlForm from "./components/input/UrlForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <Container fluid className="App">
        <Router>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
              <Link to="/" style={{ color: "#FFF" }}>
                GoList
              </Link>
            </h1>
          </header>
          <Route exact path="/" component={UrlForm} />
          <Route path="/:id" component={Listing} />
        </Router>
      </Container>
    );
  }
}

export default App;
