import React, { Component } from "react";

class UrlTextInput extends Component {
  render() {
    return (
      <label>
        Long URL #{this.props.n+1} {": "}
        <input required
          type="text"
          value={this.props.url}
          onChange={(e) => this.props.handleUrlInput(e, this.props.n)}
        />
      </label>
    );
  }
}

export default UrlTextInput;
