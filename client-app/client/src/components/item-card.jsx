import React from "react";
import { Card } from "reactstrap";
import defaultImg from "../assets/images/other-images/lightgallry-defaut.jpg";

const ListItem = (props) => {
  return (
    <Card className="card-with-border bookmark-card o-hidden">
      <div className="details-website">
        <div style={{ width: "200px", maxWidth: "200px", verticalAlign: "middle" }}>
          <img
            className="img-fluid media"
            src={props.image || defaultImg}
            alt={`logo for "${props.title}"`}
            style={{
              maxWidth: "200px",
              maxHeight: "150px",
              width: "auto",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
        <div className="desciption-data">
          <div className="title-bookmark">
            <h6 className="title_0">{props.title}</h6>
            <div className="content-general">
              <p className="weburl_0" style={{ width: "80%" }}>
                <a
                  href={props.website_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#6565e8" }}
                >
                  {/* // TODO(tugan): truncate if url is too long */}
                  {props.website_url}
                </a>
              </p>
              <p className="desc_0" style={{ width: "80%" }}>
                {props.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListItem;
