import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Grid, List } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FETCH_ITEMS } from "../../../redux/actionTypes";
import GoListItemsList from "./items-list";

const GoListDetails = (props) => {
  const dispatch = useDispatch();
  const [gridView, setgridView] = useState(false);

  useEffect(() => {
    dispatch({ type: FETCH_ITEMS, name: props.listName });
  }, [dispatch, props.listName]);
  const items = useSelector((store) => store.ItemsReducer.items);

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
                  </CardHeader>

                  {/* Items Details */}
                  <CardBody className="pb-0">
                    <GoListItemsList gridView={gridView} items={items} />
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
