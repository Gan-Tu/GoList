import React, { Component } from "react";
import UrlTextInput from "./UrlTextInput";

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      short_url: "",
      long_urls: [],
    };

    this.handleShortUrlChange = this.handleShortUrlChange.bind(this);
    this.handleLongUrlChange = this.handleLongUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddUrlInputBox = this.handleAddUrlInputBox.bind(this);
    this.handleRemoveUrlInputBox = this.handleRemoveUrlInputBox.bind(this);
  }

  handleShortUrlChange(event) {
    this.setState({ ...this.state, short_url: event.target.value });
  }

  handleLongUrlChange(event, idx) {
    let new_urls = this.state.long_urls.slice();
    new_urls[idx] = event.target.value;
    this.setState({ long_urls: new_urls });
  }

  handleSubmit(event, idx) {
    fetch(`/api/urls/save/${this.state.short_url}`, {
      method: "POST",
      body: JSON.stringify({
        long_urls: this.state.long_urls,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.err) {
          alert("See err: " + json.err);
        } else {
          alert(`Visit at goli.st/${this.state.short_url}`)
        }
      });
    event.preventDefault();
  }

  handleAddUrlInputBox() {
    this.setState({ long_urls: [...this.state.long_urls, ""] });
  }

  handleRemoveUrlInputBox(event, idx) {
    let new_urls = this.state.long_urls.slice();
    new_urls.splice(idx, 1);
    this.setState({ long_urls: new_urls });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <dl>
            <dt key="short_url">
              <label>
                Short URL: {" "}
                <input
                  required
                  type="text"
                  onChange={this.handleShortUrlChange}
                />
              </label>
            </dt>
            {this.state.long_urls.length === 0
              ? "You have no Long URLs yet"
              : this.state.long_urls.map((url, idx) => (
                  <dt key={`url_${idx}`}>
                    <UrlTextInput
                      n={idx}
                      url={url}
                      handleUrlInput={this.handleLongUrlChange}
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
