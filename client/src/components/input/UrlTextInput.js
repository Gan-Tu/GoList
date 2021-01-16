import React, { Component } from "react";
import { connect } from "react-redux";
import { setLongUrlByIndex } from "../../redux/actions/UrlActions";

class UrlTextInput extends Component {
  render() {
    return (
      <label>
        Long URL #{this.props.n + 1} {": "}
        <input
          required
          type="text"
          value={this.props.url}
          onChange={(e) =>
            this.props.setLongUrlByIndex(this.props.n, e.target.value)
          }
        />
      </label>
    );
  }
}

export default connect(null, { setLongUrlByIndex })(UrlTextInput);
