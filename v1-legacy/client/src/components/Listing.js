import React, { Component } from "react";
import { connect } from "react-redux";
import { getLongUrlsByShortUrl } from "../redux/actions/UrlActions";

import UrlCard from "./UrlCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class Listing extends Component {
  componentDidMount() {
    this.short_url = this.props.match.params.id;
    this.props.getLongUrlsByShortUrl(this.short_url);
    document.title = `GoList - goli.st/${this.short_url}`
  }

  render() {
    return (
      <Container fluid style={{ padding: 20 }}>
        <p>Short URL: goli.st/{this.short_url}</p>
        <Row className="justify-content-center">
          {this.props.long_urls.map((url) => (
            <UrlCard key={url} url={url} />
          ))}
        </Row>
      </Container>
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
