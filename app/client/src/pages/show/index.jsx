import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import UrlCard from "./url-card";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_ITEMS } from "../../redux/actionTypes";


const Sample = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((content) => content.ItemsReducer.items);

  useEffect(() => {
    document.body.className = `${
      localStorage.getItem("layout_version") || "light"
    } box-layout`;
    dispatch({ type: FETCH_ITEMS });
  }, [dispatch, items]);

  return (
    <div className="page-wrapper horizontal-wrapper" id="pageWrapper">
      <div className="page-body-wrapper">
        <div className="page-body">
          <Container fluid={true}>
            <Row>
              {items.map((metadata, idx) => (
                <Col md="6" xl="4 xl-50" key={`metadata-${idx}`}>
                  <UrlCard metadata={metadata} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Sample;
