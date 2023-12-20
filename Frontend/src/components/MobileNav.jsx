import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MobileNav() {
  const [show, handleShow] = useState(false);
  const loggedinUser = useSelector((state) => state.userModule.loggedinUser);

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  function transitionNavBar() {
    if (window.scrollY > 5) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  return (
    <>
      <div className={`mobile-nav-top ${show ? "show" : ""}`}>
        <h5>{loggedinUser.email}</h5>

        <Link to={"/my-search"}>
          <FaSearch />
        </Link>
      </div>
    </>
  );
}
