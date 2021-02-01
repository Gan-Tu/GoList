import React, { Fragment, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_LISTS } from "../../redux/actionTypes";

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
      <Breadcrumb title="My Links" show_title />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>My Links</h5>
              </CardHeader>
              <CardBody>
                <p>Here is so empty.</p>
                {lists.map((list) =>
                  list?.links.map((link) => <p key={link}>{link}</p>)
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
