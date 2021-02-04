import React from "react";
import { Card, Media } from "reactstrap";

const UrlCard = (props) => {
  // TODO(tugan): fix formatting issues with different title length, or description lengths
  return (
    <Card>
      <div className="blog-box blog-grid text-center">
        {props.metadata.image ? (
          <Media
            className="img-fluid top-radius-blog"
            src={props.metadata.image}
            alt={props.metadata.image_alt || ""}
          />
        ) : null}
        <div className="blog-details-main">
          <h6 className="blog-bottom-details"> {props.metadata.title}</h6>
          <hr />
          <ul className="blog-social">
            <li className="digits">{props.metadata.date || "Date Unknown"}</li>
            <li className="digits">{`by: ${
              props.metadata.owner || "Anonymous"
            }`}</li>
            <li className="digits">{`${props.metadata.hits || 0} Hits`}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default UrlCard;
