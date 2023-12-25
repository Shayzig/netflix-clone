import React, { useLayoutEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileFooter() {
  const [selected, setSelectedRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname === "/netflix-clone/mobile-profile") {
      setSelectedRoute("/mobile-profile");
    } else {
      setSelectedRoute("");
    }
  });

  console.log(location.pathname);

  function handleRoute(route) {
    const baseUrl = `/netflix-clone`;
    setSelectedRoute(route);
    route ? navigate(`${baseUrl + route} `) : navigate(`${baseUrl}`);
  }

  return (
    <div className="mobile-footer">
      <div className="footer-btn" onClick={() => handleRoute("")}>
        <GoHomeFill className={selected === "" ? "selected" : ""} />
        <p className={selected === "" ? "selected" : ""}>Home</p>
      </div>
      <div
        className="footer-btn"
        onClick={() => handleRoute("/mobile-profile")}
      >
        <RxAvatar
          className={selected === "/mobile-profile" ? "selected" : ""}
        />
        <p className={selected === "/mobile-profile" ? "selected" : ""}>
          My Netflix
        </p>
      </div>
    </div>
  );
}
