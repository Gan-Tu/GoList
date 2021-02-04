import React, { useEffect } from "react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";

const App = ({ children }) => {
  console.warn = () => {};

  useEffect(() => {
    // reset the body layout, so it won't be affected by box-layout of SHOW page
    document.body.className = `${
      localStorage.getItem("layout_version") || "light"
    }`;
  }, []);

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

export default App;
