import React, { useState, useEffect } from "react";

const MoonLight = (props) => {
  const [moonlight, setMoonlight] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true);
    }
  }, []);

  const toggleMoonlight = (light) => {
    if (light) {
      setMoonlight(!light);
      document.body.className = "light";
      localStorage.setItem("layout_version", "light");
    } else {
      setMoonlight(!light);
      document.body.className = "dark-only";
      localStorage.setItem("layout_version", "dark-only");
    }
  };

  return (
    <div className="mode" onClick={() => toggleMoonlight(moonlight)}>
      <i className={`fa ${moonlight ? "fa-lightbulb-o" : "fa-moon-o"}`}></i>
    </div>
  );
};
export default MoonLight;
