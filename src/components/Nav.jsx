import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  function transitionNavBar() {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  return (
    <div
      className="nav"
      style={{ backgroundColor: show ? "black" : "transparent" }}
    >
      <div className="nav-content">
        <Link to={'/netflix-clone'}>
          <img
            className="logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
        </Link>

        <Link to={"/netflix-clone/profile"}>
          <img
            className="avatar"
            src="https://media.tenor.com/sgQ73oidu1wAAAAC/netflix-avatar-smile.gif"
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
}
