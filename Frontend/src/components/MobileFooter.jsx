import React, { useLayoutEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

export default function MobileFooter() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname === "/mobile-profile") {
      setSelectedRoute("/mobile-profile");
    } else {
      setSelectedRoute("/");
    }
  });

  function handleRoute(route) {
    setSelectedRoute(route);
    navigate(route);
  }

  return (
    <div className="mobile-footer">
      <div className="footer-btn" onClick={() => handleRoute("/")}>
        <GoHomeFill className={selectedRoute === "/" ? "selected" : ""} />
        <p className={selectedRoute === "/" ? "selected" : ""}>Home</p>
      </div>
      <div
        className="footer-btn"
        onClick={() => handleRoute("/mobile-profile")}
      >
        <RxAvatar
          className={selectedRoute === "/mobile-profile" ? "selected" : ""}
        />
        <p className={selectedRoute === "/mobile-profile" ? "selected" : ""}>
          My Netflix
        </p>
      </div>
    </div>
  );
}
