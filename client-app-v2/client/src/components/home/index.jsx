import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
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
                  Quickly setup a list of links and files with one simple URL.
                </span>
              </CardHeader>
              <CardBody>
                <Row style={{ marginBottom: "10px" }}>
                  <Col>
                    <p>
                      To get started, create a new GoList for grouping a set of
                      related links. <br/>Give it a descriptive title and a short URL
                      of your chosen!
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <MyLists />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;
