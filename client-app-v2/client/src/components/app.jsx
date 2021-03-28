import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import CoreLayoutWrapper from "../layout/wrapper/core";
import GoListPanel from "./GoListPanel";

const App = () => {
  console.warn = () => {};

  return (
    <BrowserRouter basename={`/`}>
      <Switch>
        {/* Routing to Main Admin App */}
        <CoreLayoutWrapper>
          <TransitionGroup>
            <Route path={`${process.env.PUBLIC_URL}/:listName`}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={100}
                  classNames="fade"
                  unmountOnExit
                >
                  <div>
                    <GoListPanel listName={match.params.listName} />
                  </div>
                </CSSTransition>
              )}
            </Route>
          </TransitionGroup>
        </CoreLayoutWrapper>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
