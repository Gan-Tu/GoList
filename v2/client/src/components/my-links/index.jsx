import React, { Fragment } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const Sample = (props) => {
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
                <p>
                  Here is so empty.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
