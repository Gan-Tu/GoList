import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { Password, EmailAddress } from "../../constant";
import { useForm } from "react-hook-form";
import {
  firebase_app,
  googleProvider,
  twitterProvider,
  githubProvider,
} from "../../data/config";
import LOGO from "../../assets/images/logo/logo.png";
import LOGO_DARK from "../../assets/images/logo/logo_dark.png";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Twitter, GitHub } from "react-feather";
import { LOG_IN } from "../../redux/actionTypes";

const SignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const redirectToLogin = () => {
    history.push(`${process.env.PUBLIC_URL}/login`);
  };

  useEffect(() => {
    // always disable moonlight/dark-mode in login page
    document.body.className = "light";
  });

  const toggleHideShowPassword = () => {
    setTogglePassword(!togglePassword);
  };

  const showLoginError = (error) => {
    console.error(error);
    setTimeout(() => {
      toast.error("Oppss.. We weren't able to create an account for you.");
    }, 200);
    setLoading(false);
  };

  const redirectToHome = () => {
    setTimeout(() => {
      history.push(`${process.env.PUBLIC_URL}/home`);
    }, 500);
  };

  const updateUserProfileName = (userCredential) => {
    userCredential.user
      .updateProfile({
        displayName: displayName,
        photoURL: `https://avatar.oxro.io/avatar.svg?name=${encodeURIComponent(
          displayName
        )}&background=6ab04c&color=000`,
      })
      .then(() => {
        setLoading(false);
        toast.success("Account created!");
        dispatch({ type: LOG_IN, user: userCredential.user });
        redirectToHome();
      })
      .catch((error) => {
        // An error happened.
        console.error("Failed to update user profile name and photo", error);
        redirectToHome();
      });
  };

  const emailPasswordRegister = async () => {
    setLoading(true);
    firebase_app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(updateUserProfileName)
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
                  className="theme-form needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(emailPasswordRegister)}
                >
                  <h4>Sign Up</h4>
                  <p>{"Enter your personal details to sign up"}</p>
                  <FormGroup>
                    <Label className="col-form-label" for="displayName">
                      Display Name
                    </Label>
                    <Input
                      className="form-control"
                      name="displayName"
                      type="text"
                      placeholder="John Doe"
                      onChange={(e) => setDisplayName(e.target.value)}
                      innerRef={register({
                        required: "Please provide a valid display name",
                      })}
                    />
                    <span style={{ color: "red" }}>
                      {errors.displayName ? errors.displayName.message : null}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label" for="email">
                      {EmailAddress}
                    </Label>
                    <Input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="test@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      innerRef={register({
                        required: "Please provide a valid email",
                        pattern: {
                          value: /^.+@.+\..+$/,
                          message: "Please provide a valid email",
                        },
                      })}
                    />
                    <span style={{ color: "red" }}>
                      {errors.email ? errors.email.message : null}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label" for="password">
                      {Password}
                    </Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? "text" : "password"}
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*********"
                      innerRef={register({
                        required: "Please provide a valid password",
                        minLength: {
                          value: 6,
                          message:
                            "Password has to be at least 6 characters long",
                        },
                      })}
                    />
                    <span style={{ color: "red" }}>
                      {errors.password ? errors.password.message : null}
                    </span>
                    <div className="show-hide" onClick={toggleHideShowPassword}>
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <Button
                      color="primary"
                      className="btn-block"
                      disabled={loading}
                    >
                      {loading ? "LOADING..." : "Create Account"}
                    </Button>
                  </div>

                  {/* Third Party Provider */}
                  <h6 className="text-muted mt-4 or">{"Or Sign Up with"}</h6>
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
                    {"Already have an account?"}
                    <a
                      className="ml-2"
                      href="#javascript"
                      onClick={redirectToLogin}
                    >
                      Log In
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

export default SignUp;
