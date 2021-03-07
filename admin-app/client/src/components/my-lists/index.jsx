import React, { Fragment, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_LISTS, SET_LISTS } from "../../redux/actionTypes";
import ListCard from "./list-card";

const MyLists = (props) => {
  const dispatch = useDispatch();
  const lists = useSelector((store) => store.ListReducer.lists);
  const is_authenticated = useSelector(
    (store) => store.SessionReducer.is_authenticated
  );
  const uid = useSelector((store) => store.SessionReducer.user.uid);

  useEffect(() => {
    if (is_authenticated) {
      dispatch({ type: FETCH_LISTS, uid });
      console.info(`dispatched FETCH_LISTS for user UID: ${uid}`);
    } else {
      dispatch({ type: SET_LISTS, lists: [] });
    }
  }, [dispatch, is_authenticated, uid]);

  return (
    <Fragment>
      <Breadcrumb title="My Lists" show_title />
      <Container fluid={true}>
        <Row>
          {!lists || lists.length === 0 ? (
            <Col>
              <p>No lists found.</p>
            </Col>
          ) : (
            lists.map((list, idx) => (
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
            ))
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

export default MyLists;
