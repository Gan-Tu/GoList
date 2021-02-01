import React, { Fragment } from "react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";

const App = ({ children }) => {
  console.warn = () => {};

  return (
    <Fragment>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header />
        <div className="page-body-wrapper sidebar-icon">
          <Sidebar />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
