import React, {useState} from "react";

import LanguageDropdown from "./widgets/language";
import MoonLight from "./widgets/moonlight";
import NotificationWidget from "./widgets/notification";
import ProfileWidget from "./widgets/profile";

import Tour from 'reactour'

const steps = [
  {
    selector: '.language-nav',
    content: 'You can switch navigation languages here',
  },
  {
    selector: '.onhover-dropdown',
    content: 'You can view your notifications here',
  },
  {
    selector: '.moonlight-toggle',
    content: 'You can toggle between light and dark mode',
  },
  {
    selector: '.profile-nav',
    content: 'You can view your profile, or log out here',
  },
];


const Rightbar = (props) => {
  // TODO(tugan): enable tour only for new account owners
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <div className="nav-right col-8 pull-right right-header p-0">
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
      <ul className="nav-menus">
        <li className="language-nav">
          <LanguageDropdown />
        </li>
        <li className="onhover-dropdown">
          <NotificationWidget />
        </li>
        <li className="moonlight-toggle">
          <MoonLight />
        </li>
        <li className="profile-nav onhover-dropdown p-0">
          <ProfileWidget />
        </li>
      </ul>
    </div>
  );
};
export default Rightbar;
