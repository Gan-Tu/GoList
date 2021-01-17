import React, { Component } from "react";
import { connect } from "react-redux";
import { getLongUrlsByShortUrl } from "..//redux/actions/UrlActions";

class Listing extends Component {
  componentDidMount() {
    this.short_url = this.props.match.params.id;
    this.props.getLongUrlsByShortUrl(this.short_url);
  }

  render() {
    return (
      <div>
        <p>Short URL: goli.st/{this.short_url}</p>
        <ul>
          {this.props.long_urls.map((url) => (
            <dt>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </dt>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    long_urls: state.urls.long_urls,
  };
};

const mapDispatchToProps = {
  getLongUrlsByShortUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
