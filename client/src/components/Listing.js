import React, { Component } from "react";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { long_urls: [], err: null };
  }

  callAPI() {
    fetch(`/api/urls/get/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.err) {
          this.setState({ ...this.state, err: res.err });
        } else {
          this.setState({ err: null, long_urls: res.long_urls });
        }
      });
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p>Short URL: goli.st/{this.props.match.params.id}</p>
        <ul>
          {this.state.err
            ? `Error: ${this.state.err}`
            : this.state.long_urls.map((url) => (
                <dt>
                  <a href={url} target="_blank" rel="noreferrer">{url}</a>
                </dt>
              ))}
        </ul>
      </div>
    );
  }
}

export default Listing;
