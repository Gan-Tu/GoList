import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGatedWrapper = ({ children }) => {
  const authenticated = useSelector(
    (store) => store.SessionReducer.authenticated
  );

  // Give some buffer time for Firebase Auth to resolve authentication object
  var redirectTimer = null;
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  useEffect(() => {
    if (!authenticated) {
      // allow max 1 second for firebase authentication time
      redirectTimer = setTimeout(() => {
        setRedirectToLogin(true);
      }, 1000);
    } else if (authenticated && redirectTimer) {
      clearTimeout(redirectTimer);
    }
    // always cleanup timer when component unmounts
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [authenticated]);

  // conditional render the authenticated gated page
  if (authenticated) {
    return <Fragment>{children}</Fragment>;
  } else if (redirectToLogin) {
    return <Redirect to={`${process.env.PUBLIC_URL}/login`} />;
  } else {
    return (
      <Fragment>
        <p>Checking session authentication...</p>
        <p>This page will redirect after at most 1 second...</p>
      </Fragment>
    );
  }
};

export default AuthGatedWrapper;
