import React, { Fragment } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Home } from "react-feather";
import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {
  return (
    <Fragment>
      <Container fluid={true}>
        <div className="page-title">
          <Row>
            <Col xs="6">
              <h3>{props.show_title ? props.title : null}</h3>
            </Col>
            <Col xs="6">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to={`${process.env.PUBLIC_URL}/welcome/default`}>
                    <Home />
                  </Link>
                </BreadcrumbItem>
                {props.parent ? (
                  <BreadcrumbItem>{props.parent}</BreadcrumbItem>
                ) : null}
                <BreadcrumbItem active>{props.title}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Breadcrumbs;
