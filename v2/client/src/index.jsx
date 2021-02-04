import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./route";
import LogIn from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import { firebase_app } from "./data/config";
import Loader from "./layout/loader";

const Root = (props) => {
  // set animation and abort controller
  const [anim, setAnim] = useState("");
  const animation = "fade";
  const abortController = new AbortController();
  useEffect(() => {
    setAnim(animation);
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return abortController.abort();
  }, [animation, abortController]);

  // check current logged in user from firebase
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    return firebase_app.auth().onAuthStateChanged(setCurrentUser);
  }, [currentUser]);

  // delay redirect to login page, to allow firebase to get current user
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => {
        setRedirectToLogin(true);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentUser, redirectToLogin]);

  return (
    <Fragment>
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      {/* Having a loader helps delay showing UI when fetching for login details */}
      <Loader timeout="1000" />
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Switch>
            <Route
              path={`${process.env.PUBLIC_URL}/login`}
              component={LogIn}
            ></Route>

            {!currentUser ? (
              redirectToLogin ? (
                <Redirect to={`${process.env.PUBLIC_URL}/login`} />
              ) : null
            ) : (
              <App>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/`}
                  render={() => {
                    return <Redirect to={`${process.env.PUBLIC_URL}/home`} />;
                  }}
                />
                <TransitionGroup>
                  {routes.map(({ path, Component }) => (
                    <Route
                      key={path}
                      exact
                      path={`${process.env.PUBLIC_URL}${path}`}
                    >
                      {({ match }) => (
                        <CSSTransition
                          in={match != null}
                          timeout={100}
                          classNames={anim}
                          unmountOnExit
                        >
                          <div>
                            <Component />
                          </div>
                        </CSSTransition>
                      )}
                    </Route>
                  ))}
                </TransitionGroup>
              </App>
            )}
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
