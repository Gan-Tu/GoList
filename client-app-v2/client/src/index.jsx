import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import Loader from "./layout/loader";

const Root = (props) => {
  const abortController = new AbortController();
  useEffect(() => {
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return abortController.abort();
  });

  return (
    <Fragment>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
      {/* Having a loader delays showing UI when fetching for login details */}
      <Loader timeout="1000" />
      <Provider store={store}>
        <App />
      </Provider>
    </Fragment>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
