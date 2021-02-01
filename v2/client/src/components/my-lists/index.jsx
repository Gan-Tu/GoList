import React, { Fragment, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
} from "reactstrap";
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
      <Breadcrumb title="My Lists" show_title />
      <Container fluid={true}>
        {/* <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>My Lists</h5>
              </CardHeader>
              <CardBody>
                <p>Here is so empty.</p>
                {lists.map((list) =>
                  list?.links.map((link) => <p key={link}>{link}</p>)
                )}
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Media>
                  <img
                    className="img-40 img-fluid m-r-20"
                    src={require("../../assets/images/other-images/job-search-1.jpg")}
                    alt=""
                  />
                  <Media body>
                    <h6 className="f-w-600">
                      <a href="#javascript">
                        {"UIandUX_IT_Frontend_Developer"}
                      </a>
                      <span className="badge badge-primary pull-right">
                        Edit
                      </span>
                    </h6>
                    <p>
                      {"(L6) Salt Lake City, UT"}
                      <span>
                        <i className="fa fa-star font-warning"></i>
                        <i className="fa fa-star font-warning"></i>
                        <i className="fa fa-star font-warning"></i>
                        <i className="fa fa-star font-warning"></i>
                        <i className="fa fa-star font-warning"></i>
                      </span>
                    </p>
                  </Media>
                </Media>
                <p>
                  {
                    "We are looking for an experienced and creative designer and/or frontend engineer with expertise in accessibility to join our team , 3+ years of experience working in as a Frontend Engineer or comparable role. You won’t be a team of one though — you’ll be collaborating closely with other..."
                  }
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
