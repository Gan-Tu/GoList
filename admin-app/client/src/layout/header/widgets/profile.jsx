import React, { Fragment } from "react";
import man from "../../../assets/images/dashboard/profile.jpg";
import { LogIn } from "react-feather";
import { Admin, LogOut } from "../../../constant";
import { translate } from "react-switch-lang";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../../redux/actionTypes";

const ProfileWidget = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const displayName = useSelector(
    (store) => store.SessionReducer.user?.displayName
  );
  const photoURL = useSelector((store) => store.SessionReducer.user?.photoURL);

  const LogOutUser = () => {
    dispatch({ type: LOG_OUT });
    history.push(`${process.env.PUBLIC_URL}/login`);
  };

  return (
    <Fragment>
      <div className="media profile-media">
        <img className="b-r-10" src={photoURL || man} alt="avatar" />
        <div className="media-body">
          <span>{props.t(displayName || "Unknown")}</span>
          <p className="mb-0 font-roboto">
            Beta User <i className="middle fa fa-angle-down"></i>
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        <li className="onhover-dropdown">
          <LogIn />
          <span onClick={LogOutUser}>{props.t(LogOut)}</span>
        </li>
      </ul>
    </Fragment>
  );
};
export default translate(ProfileWidget);
