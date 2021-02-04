import React, { Fragment, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_LISTS } from "../../redux/actionTypes";
import ListCard from "./list-card";

const Sample = (props) => {
  const dispatch = useDispatch();
  const lists = useSelector((content) => content.ListReducer.lists);

  useEffect(() => {
    if (lists?.length === 0) {
      dispatch({ type: FETCH_LISTS });
      console.log("dispatched FETCH_LISTS");
    }
  }, [dispatch, lists]);

  return (
    <Fragment>
      <Breadcrumb title="My Lists" show_title />
      <Container fluid={true}>
        <Row>
          {lists.map((list, idx) => (
            <Col sm="4" key={`ListCard-${idx}`}>
              <ListCard
                icon_url={require("../../assets/images/other-images/job-search-1.jpg")}
                title={list.title}
                subtitle={list.subtitle}
                body={list.body}
                badge={list.badge}
                badgetxt={list.badgetxt}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
