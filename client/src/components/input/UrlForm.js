import React, { Component } from "react";
import UrlTextInput from "./UrlTextInput";
import { connect } from "react-redux";
import {
  setShortUrl,
  appendLongUrl,
  submitUrlMapping,
} from "../../redux/actions/UrlActions";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBox = this.handleAddBox.bind(this);
  }

  validateSubmitInput(urls) {
    if (!this.props.short_url?.length) {
      alert("short URL cannot be empty!");
      return false;
    } else if (!this.props.long_urls?.length) {
      alert("at least one long URL should be supplied!");
      return false;
    }
    for (let i = 0; i < this.props.long_urls.length; i++) {
      if (!this.props.long_urls[i].length) {
        alert(`long URL ${i + 1} cannot be empty`);
        return false;
      }
    }
    return true;
  }

  handleSubmit(event) {
    if (this.validateSubmitInput()) {
      this.props.submitUrlMapping(this.props.short_url, this.props.long_urls);
    }
    event.preventDefault();
  }

  handleAddBox(event) {
    this.props.appendLongUrl("");
    event.preventDefault();
  }

  render() {
    return (
      <Container fluid>
        <Row style={{ padding: 30 }} className="justify-content-center">
          <Form as={Col} md={6} sm={10}>
            {/* short URL */}
            <Form.Group as={Row} controlId="formShortUrl">
              <Form.Label column md={2} sm={4}>
                Short URL
              </Form.Label>
              <InputGroup as={Col}>
                <InputGroup.Prepend>
                  <InputGroup.Text>goli.st/</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Enter short URL"
                  onChange={(e) => this.props.setShortUrl(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            {/* Long URLs */}
            {this.props.long_urls?.length ? (
              this.props.long_urls.map((url, idx) => (
                <UrlTextInput
                  key={`formUrlTextInput-${idx}`}
                  n={idx}
                  url={url}
                />
              ))
            ) : (
              <p>You have no long URLs yet</p>
            )}
            <Button variant="secondary" onClick={this.handleAddBox} block>
              Add Long URL
            </Button>
            <Button variant="primary" onClick={this.handleSubmit} block>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    short_url: state.urls.short_url,
    long_urls: state.urls.long_urls,
  };
};

const mapDispatchToProps = {
  setShortUrl,
  appendLongUrl,
  submitUrlMapping,
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm);
