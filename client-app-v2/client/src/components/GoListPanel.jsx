import React, { useEffect } from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_ITEMS, FETCH_LIST_METADATA } from "../redux/actionTypes";
import ListItem from "./item-card";

const GoListPanel = (props) => {
  const dispatch = useDispatch();
  const listMetadata = useSelector((content) => content.ListReducer.metadata);
  const items = useSelector((content) => content.ItemsReducer.items);

  useEffect(() => {
    document.body.className = `${
      localStorage.getItem("layout_version") || "light"
    } box-layout`;
    dispatch({ type: FETCH_LIST_METADATA, listName: props.listName });
    dispatch({ type: FETCH_ITEMS, listName: props.listName });
    return () => {
      // undo the box layout when component unmounts
      document.body.className =
        localStorage.getItem("layout_version") || "light";
    };
  }, [dispatch, props.listName]);

  return (
    <Row className="bookmark-wrap email-wrap" style={{ width: "100%" }}>
      <div className="bookmark-tabcontent" style={{ width: "100%" }}>
        <div className="pl-0 tab-content" style={{ width: "100%" }}>
          <div
            className="details-bookmark text-center list-bookmark"
            style={{ width: "100%" }}
          >
            <Card style={{ margin: 0, minHeight: "500px", width: "100%" }}>
              <CardHeader>
                <h5>{listMetadata?.title || `goli.st/${props.listName}`}</h5>
                <span>
                  {listMetadata
                    ? `Created by ${listMetadata.owner_display_name} on ${
                        listMetadata.update_date?.split("T")[0]
                      }`
                    : null}
                </span>
                <div style={{ paddingTop: "20px" }}>
                  <p style={{ color: "rgb(43,43,43)" }}>
                    {listMetadata?.description || "This list does not exist."}
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {items.length > 0 ? (
                    items.map((data, index) => {
                      return (
                        <Col
                          xl="3 xl-50"
                          md="4"
                          key={index}
                          style={{
                            paddingLeft: "50px",
                            paddingRight: "50px",
                            minHeight: "150px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          <ListItem
                            image={data.image_url}
                            title={data.title}
                            website_url={data.link}
                            desc={data.description}
                            itemId={data.itemId}
                            listName={"demo"}
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
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default GoListPanel;
