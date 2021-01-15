import React, { Component } from "react";
import UrlTextInput from "./UrlTextInput";

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddUrlInputBox = this.handleAddUrlInputBox.bind(this);
    this.handleRemoveUrlInputBox = this.handleRemoveUrlInputBox.bind(this);
  }

  handleChange(event, idx) {
    let new_urls = this.state.urls.slice();
    new_urls[idx] = event.target.value;
    this.setState({ urls: new_urls });
  }

  handleSubmit(event, idx) {
    alert("URLs saved: " + this.state.urls);
    event.preventDefault();
  }

  handleAddUrlInputBox() {
    this.setState({ urls: [...this.state.urls, ""] });
  }

  handleRemoveUrlInputBox(event, idx) {
    let new_urls = this.state.urls.slice();
    new_urls.splice(idx, 1);
    this.setState({ urls: new_urls });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <dl>
            {this.state.urls.length === 0
              ? "You have no URLs yet"
              : this.state.urls.map((url, idx) => (
                  <dt key={`url_${idx}`}>
                    <UrlTextInput
                      n={idx}
                      url={url}
                      handleUrlInput={this.handleChange}
                    />
                    <button
                      onClick={(e) => this.handleRemoveUrlInputBox(e, idx)}
                    >
                      Remove
                    </button>
                  </dt>
                ))}
          </dl>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <button onClick={() => this.handleAddUrlInputBox()}>
          Add URL Input box
        </button>
      </div>
    );
  }
}

export default UrlForm;
