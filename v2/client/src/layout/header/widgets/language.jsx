// For more, see https://www.npmjs.com/package/react-switch-lang

import React, { useState } from "react";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
} from "react-switch-lang";

import { English, More, 简体中文 } from "../../../constant";

import en from "../../../assets/i18n/en.json";
import cn from "../../../assets/i18n/cn.json";

setTranslations({ en, cn });
setDefaultLanguage("en");
setLanguageCookie();

const LanguageDropdown = (props) => {
  const [langdropdown, setLangDropdown] = useState(false);
  const [selected, setSelectedLanguage] = useState("en");

  const handleSetLanguage = (key) => {
    setLanguage(key);
    setSelectedLanguage(key);
  };

  const setLanguageSelection = (languageDropdownOpened) => {
    if (languageDropdownOpened) {
      setLangDropdown(!languageDropdownOpened);
    } else {
      setLangDropdown(!languageDropdownOpened);
    }
  };

  return (
    <div className={`translate_wrapper ${langdropdown ? "active" : ""}`}>
      {/* Main Icon on Widget that shows currently selected language */}
      <div className="current_lang">
        <div
          className="lang"
          onClick={() => setLanguageSelection(langdropdown)}
        >
          <i
            className={`flag-icon flag-icon-${
              selected === "en" ? "us" : selected
            }`}
          ></i>
          <span className="lang-txt">{selected}</span>
        </div>
      </div>

      {/* Dropdown for selecting i18N languages */}
      <div className={`more_lang ${langdropdown ? "active" : ""}`}>
        <div className="lang" onClick={() => handleSetLanguage("en")}>
          <i className="flag-icon flag-icon-us"></i>
          <span className="lang-txt">
            {English}
            <span> {"(US)"}</span>
          </span>
        </div>
        <div className="lang" onClick={() => handleSetLanguage("cn")}>
          <i className="flag-icon flag-icon-cn"></i>
          <span className="lang-txt">{简体中文}</span>
        </div>
      </div>
    </div>
  );
};
export default LanguageDropdown;
