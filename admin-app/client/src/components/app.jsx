import React, { useEffect } from "react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";

import { useDispatch } from "react-redux";
import { LOG_IN } from "../redux/actionTypes";
import { firebase_app } from "../data/config";

const App = ({ children }) => {
  console.warn = () => {};
  const dispatch = useDispatch();

  useEffect(() => {
    // reset the body layout, so it won't be affected by box-layout of SHOW page
    document.body.className = `${
      localStorage.getItem("layout_version") || "light"
    }`;
  }, []);

  useEffect(() => {
    return firebase_app.auth().onAuthStateChanged((user) => {
      console.log(user);
      dispatch({ type: LOG_IN, user });
    });
  }, [dispatch]);

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
