import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import MyLists from "../my-lists";

const HomePage = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="page-title">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Welcome to GoList!</h5>
                <span>
                  Here, you can quickly edit and browse a list of links and
                  files with one simple URL
                </span>
              </CardHeader>
            </Card>
            <MyLists />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;
