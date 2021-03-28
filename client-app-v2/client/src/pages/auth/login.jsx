import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { Password, SignIn, EmailAddress } from "../../constant";

import {
  firebase_app,
  googleProvider,
  twitterProvider,
  githubProvider,
} from "../../data/config";
import LOGO from "../../assets/images/logo/logo.png";
import LOGO_DARK from "../../assets/images/logo/logo_dark.png";

import { useSelector } from "react-redux";

import { Twitter, GitHub } from "react-feather";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const authenticated = useSelector(
    (store) => store.SessionReducer.authenticated
  );

  useEffect(() => {
    // always disable moonlight/dark-mode in login page
    document.body.className = "light";
    if (authenticated) {
      history.push(`${process.env.PUBLIC_URL}/home`);
    }
  }, [history, authenticated]);

  const toggleHideShowPassword = () => {
    setTogglePassword(!togglePassword);
  };

  const redirectToHome = () => {
    setTimeout(() => {
      history.push(`${process.env.PUBLIC_URL}/home`);
    }, 200);
  };

  const redirectToSignUpPage = () => {
    history.push(`${process.env.PUBLIC_URL}/signup`);
  };

  const showLoginError = (error) => {
    console.error(error);
    setTimeout(() => {
      toast.error("Oppss.. The password is invalid or the user doesn't exist.");
    }, 200);
    setLoading(false);
  };

  const emailPasswordAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    firebase_app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(redirectToHome)
      .catch(showLoginError);
  };

  const authWith3rdPartyProvider = async (provider) => {
    firebase_app
      .auth()
      .signInWithPopup(provider)
      .then(redirectToHome)
      .catch(showLoginError);
  };

  return (
    <Container fluid={true} className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="#javascript">
                  <img className="img-fluid for-light" src={LOGO} alt="" />
                  <img className="img-fluid for-dark" src={LOGO_DARK} alt="" />
                </a>
              </div>
              <div className="login-main login-tab">
                <Form
                  className="theme-form"
                  onSubmit={(e) => emailPasswordAuth(e)}
                >
                  <h4>Log In</h4>
                  <p>{"Enter your email & password to login"}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required
                      placeholder="test@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? "text" : "password"}
                      name="login[password]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={toggleHideShowPassword}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <Button
                      color="primary"
                      className="btn-block"
                      disabled={loading}
                    >
                      {loading ? "LOADING..." : SignIn}
                    </Button>
                  </div>

                  {/* Third Party Provider */}
                  <h6 className="text-muted mt-4 or">{"Or Log in with"}</h6>
                  <div className="social mt-4">
                    <div className="btn-showcase">
                      <Button
                        color="light"
                        onClick={() => authWith3rdPartyProvider(googleProvider)}
                      >
                        <i className="icon-social-google txt-googleplus"></i>
                      </Button>
                      <Button
                        color="light"
                        onClick={() =>
                          authWith3rdPartyProvider(twitterProvider)
                        }
                      >
                        <Twitter className="txt-twitter" />
                      </Button>
                      <Button
                        color="light"
                        onClick={() => authWith3rdPartyProvider(githubProvider)}
                      >
                        <GitHub />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Don't have account?"}
                    <a
                      className="ml-2"
                      href="#javascript"
                      onClick={redirectToSignUpPage}
                    >
                      Create Account
                    </a>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
