import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import CoreLayoutWrapper from "../layout/wrapper/core";
import AuthGatedWrapper from "./auth_wrapper";
import { routes } from "../route";

import LogIn from "../pages/auth/login";
import SignUp from "../pages/auth/signup";
import { LOG_IN } from "../redux/actionTypes";
import { firebase_app } from "../data/config";

const App = () => {
  console.warn = () => {};

  // Subscribe to and update the global authentication state, at app root.
  const dispatch = useDispatch();
  useEffect(() => {
    return firebase_app.auth().onAuthStateChanged((user) => {
      dispatch({ type: LOG_IN, user });
    });
  }, [dispatch]);

  return (
    <BrowserRouter basename={`/`}>
      <Switch>
        {/* Redirect root page to /home */}
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          render={() => {
            return <Redirect to={`${process.env.PUBLIC_URL}/home`} />;
          }}
        />

        {/* Routing to Special Pages */}
        <Route
          path={`${process.env.PUBLIC_URL}/login`}
          component={LogIn}
        ></Route>

        <Route
          path={`${process.env.PUBLIC_URL}/signup`}
          component={SignUp}
        ></Route>

        {/* Routing to Pages requiring users to be logged in */}
        <AuthGatedWrapper>
          {/* Routing to Main Admin App */}
          <CoreLayoutWrapper>
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
                      classNames="fade"
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
          </CoreLayoutWrapper>
        </AuthGatedWrapper>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
