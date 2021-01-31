import React, { Fragment, useEffect } from "react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import { firebase_app } from "../data/config";
import { useHistory } from 'react-router-dom'

const App = ({ children }) => {
  console.warn = () => {};
  
  const history = useHistory();

  useEffect(() => {
    if (!firebase_app.auth().currentUser) {
      history.push(`${process.env.PUBLIC_URL}/login`);
    }
  })

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
