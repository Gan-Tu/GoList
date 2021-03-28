import React from "react";

const CoreLayoutWrapper = ({ children }) => {
  return (
    <div className="page-wrapper compact-wrapper box-layout" id="pageWrapper">
      <div className="page-body-wrapper sidebar-icon">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CoreLayoutWrapper;
