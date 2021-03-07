import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import Footer from "../footer";

const CoreLayoutWrapper = ({ children }) => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Header />
      <div className="page-body-wrapper sidebar-icon">
        <Sidebar />
        <div className="page-body">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default CoreLayoutWrapper;
