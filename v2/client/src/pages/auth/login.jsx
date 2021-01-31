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
import {
  Password,
  SignIn,
  EmailAddress,
  RememberPassword,
  ForgotPassword,
} from "../../constant";

import {
  firebase_app,
  googleProvider,
  firebaseLocalPersistence,
} from "../../data/config";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = (props) => {
  const history = useHistory();
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    // always disable moonlight/dark-mode in login page
    document.body.className = "light";

    firebase_app.auth().onAuthStateChanged(function (user) {
      if (user) {
        history.push(`${process.env.PUBLIC_URL}/home`);
      }
    });
  }, []);

  const hideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  const emailPasswordAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    firebase_app
      .auth()
      .setPersistence(firebaseLocalPersistence)
      .then(() => {
        firebase_app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setTimeout(() => {
              props.history.push(`${process.env.PUBLIC_URL}/home`);
            }, 200);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setTimeout(() => {
              toast.error(
                "Oppss.. The password is invalid or the user doesn't exist."
              );
            }, 200);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          toast.error("Oppss.. Someething went wrong.");
        }, 200);
        setLoading(false);
      });
  };

  const googleAuth = async () => {
    firebase_app
      .auth()
      .setPersistence(firebaseLocalPersistence)
      .then(() => {
        firebase_app
          .auth()
          .signInWithPopup(googleProvider)
          .then((result) => {
            setTimeout(() => {
              props.history.push(`${process.env.PUBLIC_URL}/home`);
            }, 200);
          })
          .catch((error) => {
            console.error(error);
            setTimeout(() => {
              toast.error(
                "Oppss.. Something went wrong with Google authentication"
              );
            }, 200);
          });
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          toast.error("Oppss.. Someething went wrong.");
        }, 200);
        setLoading(false);
      });
  };

  return (
    <Container fluid={true} className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="#javascript">
                  <img
                    className="img-fluid for-light"
                    src={require("../../assets/images/logo/logo.png")}
                    alt=""
                  />
                  <img
                    className="img-fluid for-dark"
                    src={require("../../assets/images/logo/logo_dark.png")}
                    alt=""
                  />
                </a>
              </div>
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <h4>Sign In</h4>
                  <p>{"Enter your email & password to login"}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="test@gmail.com"
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
                      required=""
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={() => hideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <div className="checkbox ml-3">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a>
                    <Button
                      color="primary"
                      className="btn-block"
                      disabled={loading}
                      onClick={(e) => emailPasswordAuth(e)}
                    >
                      {loading ? "LOADING..." : SignIn}
                    </Button>
                  </div>
                  <h6 className="text-muted mt-4 or">{"Or Sign in with"}</h6>
                  <div className="social mt-4">
                    <div className="btn-showcase">
                      <Button color="light" onClick={googleAuth}>
                        <i className="icon-social-google txt-googleplus"></i>
                      </Button>
                    </div>
                  </div>
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
