import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setLongUrlByIndex,
  removeLongUrlByIndex,
} from "../../redux/actions/UrlActions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

class UrlTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
    this.metadataFetchTimeOut = 0;
    this.handleRemoveBox = this.handleRemoveBox.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleRemoveBox(event, idx) {
    this.props.removeLongUrlByIndex(idx);
    event.preventDefault();
  }

  handleUserInput(event) {
    if (this.metadataFetchTimeOut) {
      clearTimeout(this.metadataFetchTimeOut);
    }
    this.metadataFetchTimeOut = setTimeout(() => {
      fetch(`/api/urls/fetchMetadata/${encodeURIComponent(event.target.value)}`)
        .then((res) => res.json())
        .then((json) =>
          this.setState({
            ...this.state,
            title: json.title,
            description: json.description,
          })
        );
    }, 1500);
    this.props.setLongUrlByIndex(this.props.n, event.target.value);
  }

  render() {
    let urlTitle, urlDescription;
    if (this.state.title.length) {
      urlTitle = (
        <Row style={{ textAlign: "left" }}>
          <Form.Text id="title" muted>
            <b>Title: </b>
            {this.state.title}
          </Form.Text>
        </Row>
      );
    }
    if (this.state.description.length) {
      urlDescription = (
        <Row style={{ textAlign: "left" }}>
          <Form.Text id="description" muted>
            <b>Description: </b>
            {this.state.description}
          </Form.Text>
        </Row>
      );
    }
    return (
      <Form.Group as={Row} controlId={`formLongUrl-${this.props.n + 1}`}>
        <Form.Label column md={2} sm={4}>
          {this.props.n === 0 ? "Long URL" : ""}
        </Form.Label>
        <Col>
          <Row>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>#{this.props.n + 1}</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                key={this.props.n + 1}
                className="required"
                placeholder={`Enter long URL #${this.props.n + 1}`}
                value={this.props.url}
                onChange={this.handleUserInput}
              />
              <InputGroup.Append>
                <Button
                  variant="danger"
                  onClick={(e) => this.handleRemoveBox(e, this.props.n)}
                >
                  Remove
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Row>
          {urlTitle}
          {urlDescription}
        </Col>
      </Form.Group>
    );
  }
}

const mapDispatchToProps = {
  setLongUrlByIndex,
  removeLongUrlByIndex,
};

export default connect(null, mapDispatchToProps)(UrlTextInput);
