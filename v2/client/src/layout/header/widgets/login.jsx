import React, { Fragment, useState, useEffect } from "react";
import man from "../../../assets/images/dashboard/profile.jpg";
import { LogIn } from "react-feather";
import { Admin, LogOut } from "../../../constant";
import { translate } from "react-switch-lang";
import { useHistory } from "react-router-dom";

import { firebase_app } from "../../../data/config";

const LoginWidget = (props) => {
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState("");
  const [name, setName] = useState("Unknown");

  const LogOutUser = () => {
    firebase_app.auth().signOut();
    history.push(`${process.env.PUBLIC_URL}/login`);
  };

  const saveUserMetadata = (user) => {
    setName(user?.displayName || user?.email);
    setPhotoUrl(user?.photoURL);
  };

  useEffect(() => {
    firebase_app.auth().onAuthStateChanged(function (user) {
      if (user) {
        saveUserMetadata(user);
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="media profile-media">
        <img className="b-r-10" src={photoUrl || man} />
        {/* TODO(tugan): change this to profile name fetched by user */}
        <div className="media-body">
          <span>{props.t(name || "Unknown")}</span>
          <p className="mb-0 font-roboto">
            {props.t(Admin)} <i className="middle fa fa-angle-down"></i>
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {/* TODO(tugan): connect to logout */}
        <li>
          <LogIn />
          <span onClick={LogOutUser}>{props.t(LogOut)}</span>
        </li>
      </ul>
    </Fragment>
  );
};
export default translate(LoginWidget);
