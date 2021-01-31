import React from "react";

import LanguageDropdown from "./widgets/language";
import MoonLight from "./widgets/moonlight";
import NotificationWidget from "./widgets/notification";
import LoginWidget from "./widgets/login";

const Rightbar = (props) => {
  return (
    <div className="nav-right col-8 pull-right right-header p-0">
      <ul className="nav-menus">
        <li className="language-nav">
          <LanguageDropdown />
        </li>
        <li className="onhover-dropdown">
          <NotificationWidget />
        </li>
        <li>
          <MoonLight />
        </li>
        <li className="profile-nav onhover-dropdown p-0">
          <LoginWidget />
        </li>
      </ul>
    </div>
  );
};
export default Rightbar;
