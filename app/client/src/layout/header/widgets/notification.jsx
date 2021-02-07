import React, { Fragment, useState } from "react";
import { Bell } from "react-feather";
import { Notification } from "../../../constant";
import { translate } from "react-switch-lang";

const NotificationWidget = (props) => {
  const [notificationDropdown, setNotificationDropDown] = useState(false);

  return (
    <Fragment>
      {/* Bell notification icon */}
      <div
        className="notification-box"
        onClick={() => setNotificationDropDown(!notificationDropdown)}
      >
        <Bell />
        {/* TODO(tugan): fetch from backends */}
        <span className="badge badge-pill badge-secondary">0</span>
      </div>

      {/* List of notifications, when toggled */}
      <ul
        className={`notification-dropdown onhover-show-div ${
          notificationDropdown ? "active" : ""
        }`}
      >
        <li>
          <Bell />
          <h6 className="f-18 mb-0">
            {Notification ? props.t(Notification) : null}
          </h6>
        </li>
        <li>
          <p>
            {/* TODO(tugan): fetch from backends */}
            <i className="fa fa-circle-o mr-3 font-warning"> </i>
            {props.t("You have no notifications yet")}
            {/* <span className="pull-right">{"10 min."}</span> */}
          </p>
        </li>
      </ul>
    </Fragment>
  );
};
export default translate(NotificationWidget);
