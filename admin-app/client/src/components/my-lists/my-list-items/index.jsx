import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { Grid, List, PlusSquare } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FETCH_ITEMS } from "../../../redux/actionTypes";
import GoListItemsList from "./items-list";
import CreateListItemModal from "./create-list-item-modal";

const GoListDetails = (props) => {
  const dispatch = useDispatch();
  const [gridView, setgridView] = useState(false);

  useEffect(() => {
    dispatch({ type: FETCH_ITEMS, listName: props.listName });
  }, [dispatch, props.listName]);
  const items = useSelector((store) => store.ItemsReducer.items);

  const [showCreateListItemForm, setShowCreateListItemForm] = useState(false);
  const toggleCreateListItemForm = () =>
    setShowCreateListItemForm(!showCreateListItemForm);

  return (
    // TODO(tugan): add ability to edit list metadata itself
    <Container fluid={true}>
      <div className="bookmark-wrap email-wrap">
        <Row>
          <Col className="box-col-12">
            <div className="bookmark-tabcontent">
              <div className="pl-0 tab-content">
                <Card className="mb-0">
                  {/* List Details */}
                  <CardHeader className="d-flex">
                    <p>goli.st/{props.listName}</p>
                    <h6 className="f-w-600">{props.listTitle}</h6>
                    <ul>
                      <li>
                        <Button
                          color="primary"
                          className="ml-3 add-new-task-btn"
                          id="add-new"
                          onClick={toggleCreateListItemForm}
                        >
                          <PlusSquare /> Add New
                        </Button>
                        <CreateListItemModal
                          showForm={showCreateListItemForm}
                          toggleForm={toggleCreateListItemForm}
                          listName={props.listName}
                        />
                      </li>
                    </ul>
                  </CardHeader>

                  {/* Items Details */}
                  <CardBody className="pb-0">
                    <div className="d-flex" style={{ marginBottom: "40px" }}>
                      <span></span>
                      <span></span>
                      <ul>
                        <li>
                          <a className="list-layout-view" href="#javascript">
                            <List onClick={() => setgridView(false)} />
                          </a>
                        </li>
                        <li>
                          <a className="grid-bookmark-view" href="#javascript">
                            <Grid onClick={() => setgridView(true)} />
                          </a>
                        </li>
                      </ul>
                    </div>

                    <GoListItemsList
                      gridView={gridView}
                      items={items}
                      listName={props.listName}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default GoListDetails;
