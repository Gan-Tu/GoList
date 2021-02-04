import React from "react";
import { Row } from "reactstrap";
import LeftHeader from "./leftbar";
import RightHeader from "./rightbar";

const Header = (props) => {
  return (
    <div className="page-header">
      <Row className="header-wrapper m-0">
        <LeftHeader />
        <RightHeader />
      </Row>
    </div>
  );
};

export default Header;
