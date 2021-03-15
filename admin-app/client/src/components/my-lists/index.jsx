import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_LISTS, SET_LISTS } from "../../redux/actionTypes";
import ListCard from "./list-card";
import CreateListModal from "./create-list-modal";
import ICON from "../../assets/images/other-images/list.svg";

const MyLists = (props) => {
  const dispatch = useDispatch();
  const lists = useSelector((store) => store.ListReducer.lists);
  const authenticated = useSelector(
    (store) => store.SessionReducer.authenticated
  );
  const uid = useSelector((store) => store.SessionReducer.user?.uid);

  useEffect(() => {
    if (authenticated && uid) {
      dispatch({ type: FETCH_LISTS, uid });
      console.info(`dispatched FETCH_LISTS for user UID: ${uid}`);
    } else {
      dispatch({ type: SET_LISTS, lists: [] });
    }
  }, [dispatch, authenticated, uid]);

  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const toggleCreateListForm = () => setShowCreateListForm(!showCreateListForm);
  return (
    <Fragment>
      <Container fluid={true}>
        {/* Modal to create new GoList */}
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            <ButtonGroup>
              <Button
                className="btn-pill btn-air-success"
                color="success"
                onClick={toggleCreateListForm}
              >
                Create New GoList
              </Button>
            </ButtonGroup>
            <CreateListModal
              showCreateListForm={showCreateListForm}
              toggleCreateListForm={toggleCreateListForm}
            />
          </Col>
        </Row>
        {/* The GoLists owned by the user */}
        <Row>
          {!lists || lists.length === 0 ? (
            <Col>
              <p>No lists found.</p>
            </Col>
          ) : (
            lists.map((list, idx) =>
              list ? (
                <Col sm="12" md="6" lg="4"  key={`ListCard-${idx}`}>
                  <ListCard
                    icon_url={ICON}
                    title={list.title}
                    listName={list.listName}
                    body={list.description}
                    badge={list.badge}
                    badgetxt={list.badgetxt}
                  />
                </Col>
              ) : null
            )
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

export default MyLists;
