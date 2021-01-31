import React, { Fragment } from "react";
import man from "../../../assets/images/dashboard/profile.jpg";
import { LogIn } from "react-feather";
import { Admin, LogOut } from "../../../constant";
import { translate } from "react-switch-lang";

const LoginWidget = (props) => {
  return (
    <Fragment>
      <div className="media profile-media">
        <img className="b-r-10" src={man} alt="" />
        {/* TODO(tugan): change this to profile name fetched by user */}
        <div className="media-body">
          <span>{props.t("Gan or Travis")}</span>
          <p className="mb-0 font-roboto">
            {props.t(Admin)} <i className="middle fa fa-angle-down"></i>
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {/* TODO(tugan): connect to logout */}
        <li>
          <LogIn />
          <span>{props.t(LogOut)}</span>
        </li>
      </ul>
    </Fragment>
  );
};
export default translate(LoginWidget);
