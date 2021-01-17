import React, { Component } from "react";

import { connect } from "react-redux";
import { getUrlMetadata } from "../redux/actions/UrlActions";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class UrlCard extends Component {
  componentDidMount() {
    this.props.getUrlMetadata(this.props.url);
  }

  render() {
    let metadata = this.props.url_metadata[this.props.url];
    let title, description, image;
    if (metadata) {
      if (metadata.title?.length) {
        title = <Card.Title>{metadata.title}</Card.Title>;
      }
      if (metadata.description?.length) {
        description = <Card.Text>{metadata.description}</Card.Text>;
      }
      let image_url;
      if (metadata["og:image"]?.length) {
        image_url = metadata["og:image"];
      } else if (metadata["twitter:image"]?.length) {
        image_url = metadata["twitter:image"];
      } else if (metadata["image"]?.length) {
        image_url = metadata["image"];
      }
      if (image_url) {
        if (image_url[0] === "/") {
          image_url = `${this.props.url}/${image_url}`;
        }
        image = (
          <Card.Img
            variant="top"
            src={image_url}
            style={{
              maxHeight: "200px",
              maxWidth: "450px",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        );
      }
    }

    return (
      <Card as={Col} md={4} sm={6} style={{ maxHeight: 500 }}>
        {image}
        <Card.Body>
          {title}
          {description}
          <a href={this.props.url} target="_blank" rel="noreferrer">
            <Button variant="primary">{this.props.url}</Button>
          </a>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url_metadata: state.urls.url_metadata,
  };
};

const mapDispatchToProps = {
  getUrlMetadata,
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlCard);
