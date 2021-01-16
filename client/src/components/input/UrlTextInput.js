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
    this.handleRemoveBox = this.handleRemoveBox.bind(this);
  }

  handleRemoveBox(event, idx) {
    this.props.removeLongUrlByIndex(idx);
    event.preventDefault();
  }

  render() {
    return (
      <Form.Group as={Row} controlId={`formLongUrl-${this.props.n + 1}`}>
        <Form.Label column md={2} sm={4}>
          {this.props.n === 0 ? "Long URL" : "" }
        </Form.Label>
        <InputGroup as={Col}>
          <InputGroup.Prepend>
            <InputGroup.Text>#{this.props.n + 1}</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            key={this.props.n + 1}
            className="required"
            placeholder={`Enter long URL #${this.props.n + 1}`}
            value={this.props.url}
            onChange={(e) =>
              this.props.setLongUrlByIndex(this.props.n, e.target.value)
            }
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
      </Form.Group>
    );
  }
}

const mapDispatchToProps = {
  setLongUrlByIndex,
  removeLongUrlByIndex,
};

export default connect(null, mapDispatchToProps)(UrlTextInput);
