import React, { Component } from "react";
import UrlTextInput from "./UrlTextInput";
import { connect } from "react-redux";
import {
  setShortUrl,
  appendLongUrl,
  removeLongUrlByIndex,
  submitUrlMapping,
} from "../../redux/actions/UrlActions";

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBox = this.handleAddBox.bind(this);
    this.handleRemoveBox = this.handleRemoveBox.bind(this);
  }

  handleSubmit(event) {
    this.props.submitUrlMapping(this.props.short_url, this.props.long_urls);
    event.preventDefault();
  }

  handleAddBox(event) {
    this.props.appendLongUrl("");
    event.preventDefault();
  }

  handleRemoveBox(event, idx) {
    this.props.removeLongUrlByIndex(idx);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <dl>
            <dt key="short_url">
              <label>
                Short URL:{" "}
                <input
                  required
                  type="text"
                  onChange={(e) => this.props.setShortUrl(e.target.value)}
                />
              </label>
            </dt>
            {this.props.long_urls.length === 0
              ? "You have no Long URLs yet"
              : this.props.long_urls.map((url, idx) => (
                  <dt key={`url_${idx}`}>
                    <UrlTextInput n={idx} url={url} />
                    <button onClick={(e) => this.handleRemoveBox(e, idx)}>
                      Remove
                    </button>
                  </dt>
                ))}
          </dl>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <button onClick={this.handleAddBox}>Add URL Input box </button>
      </div>
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
  removeLongUrlByIndex,
  submitUrlMapping,
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm);
