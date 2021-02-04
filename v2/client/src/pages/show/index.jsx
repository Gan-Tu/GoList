import React, { useState, useEffect } from "react";
import placeholderImg from "../../assets/images/other-images/sidebar-bg.jpg";
import { Container, Row, Col } from "reactstrap";
import UrlCard from "./url-card";

const IMAGE_URL_CARD_PLACEHOLDER = {
  title: "Lorem ipsum dolor sit amet, consectetur.",
  image: placeholderImg,
  date: "9 April 2019",
  owner: "Admin",
  hits: 100,
};

const TEXT_URL_CARD_PLACEHOLDER = {
  title: "Lorem ipsum dolor sit amet, consectetur.",
  date: "9 April 2019",
  owner: "Admin",
  hits: 100,
};

const INITIAL_PLACEHOLDER_CARDS = Array(3)
  .fill(IMAGE_URL_CARD_PLACEHOLDER)
  .concat(Array(9).fill(TEXT_URL_CARD_PLACEHOLDER));

const Sample = (props) => {
  const [urlMetadata] = useState(INITIAL_PLACEHOLDER_CARDS);

  useEffect(() => {
    document.body.className = `${
      localStorage.getItem("layout_version") || "light"
    } box-layout`;
  }, []);

  return (
    <div className="page-wrapper horizontal-wrapper" id="pageWrapper">
      <div className="page-body-wrapper">
        <div className="page-body">
          <Container fluid={true}>
            <Row>
              {urlMetadata.map((metadata, idx) => (
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
