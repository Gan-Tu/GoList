import React from "react";
import { Row, Col } from "reactstrap";
import ListItem from "./item-card";

const GoListItemsList = (props) => {
  return (
    <div
      className={`details-bookmark text-center ${
        props.gridView ? "" : "list-bookmark"
      }`}
    >
      <Row id="bookmarkData">
        {props.items.length > 0 ? (
          props.items.map((data, index) => {
            return (
              <Col xl="3 xl-50" md="4" key={index} style={{ paddingRight: 0 }}>
                <ListItem
                  image={data.image_url}
                  title={data.title}
                  website_url={data.link}
                  desc={data.description}
                  itemId={data.itemId}
                  listName={props.listName}
                />
              </Col>
            );
          })
        ) : (
          <Col xl="12">
            <div>
              <span>No List Items Found</span>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GoListItemsList;
