import React, { Fragment } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import MyLists from "../my-lists";

const HomePage = (props) => {
  const listCount = useSelector((content) => content.ListReducer.lists.length);

  return (
    <Fragment>
      <Breadcrumb title="Home" />
      <Container fluid={true}>
        <Row className="appointment-sec">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Welcome to GoList!</h5>
                <span>
                  Here, you can quickly edit and browse a list of links and
                  files with one simple URL
                </span>
              </CardHeader>
              <CardBody>
                <p>
                  Currently, you have <b>{listCount || 0}</b> lists configured.
                </p>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="6" className="alert-sec">
            <Card className="bg-img">
              <CardHeader>
                <div className="header-top">
                  <h5 className="m-0">{"Alert"}  </h5>
                  <div className="dot-right-icon"><i className="fa fa-ellipsis-h"></i></div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="body-bottom">
                  <h6>  {"10% off For drama lights Couslations..."}</h6><span className="font-roboto">{"Lorem Ipsum is simply dummy...It is a long established fact that a reader will be distracted by "} </span>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          <MyLists />
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;
