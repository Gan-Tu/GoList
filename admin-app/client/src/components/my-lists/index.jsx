import React, { Fragment, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_LISTS, SET_LISTS } from "../../redux/actionTypes";
import ListCard from "./list-card";
import { firebase_app } from "../../data/config";

const Sample = (props) => {
  const dispatch = useDispatch();
  const lists = useSelector((content) => content.ListReducer.lists);

  useEffect(() => {
    const cleanup = firebase_app.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch({ type: FETCH_LISTS, user });
        console.log(`dispatched FETCH_LISTS for user UID: ${user.uid}`);
      } else {
        // cleanup lists
        dispatch({ type: SET_LISTS, lists: [] });
      }
    });
    return cleanup;
  }, [dispatch]);

  return (
    <Fragment>
      <Breadcrumb title="My Lists" show_title />
      <Container fluid={true}>
        <Row>
          {!lists || lists.length === 0
            ? <Col><p>No lists found.</p></Col>
            : lists.map((list, idx) => (
                <Col sm="4" key={`ListCard-${idx}`}>
                  <ListCard
                    icon_url={require("../../assets/images/other-images/job-search-1.jpg")}
                    title={list.title}
                    listName={list.listName}
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
