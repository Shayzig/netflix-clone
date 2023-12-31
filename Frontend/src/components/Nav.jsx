import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { setDebouncedFilterBy } from "../store/actions/movie.action";
import MobileNav from "./MobileNav";

export default function Nav() {
  const [show, handleShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [isClicked, setIsClicked] = useState("");

  const filterBy = useSelector((state) => state.movieModule.filterby);
  const [register] = useForm(filterBy, setDebouncedFilterBy);

  const mobileMode = useSelector((state) => state.userModule.mobileMode);

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
    <>
      <div
        className="nav"
        style={{ backgroundColor: show ? "black" : "transparent" }}
      >
        <div className="left">
          <Link to={"/netflix-clone"}>
            <img
              className="logo"
              src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
              alt=""
            />
          </Link>

          <nav>
            <Link
              className={isClicked === "home" ? "clicked" : ""}
              onClick={() => setIsClicked("home")}
              to={"/netflix-clone"}
            >
              Home
            </Link>

            <Link
              className={isClicked === "my-list" ? "clicked" : ""}
              onClick={() => setIsClicked("my-list")}
              to={"/my-list"}
            >
              My List
            </Link>
          </nav>
        </div>

        <div className="user-btns">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>

            <input
              placeholder="Titles"
              {...register("movie")}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>

          <Link to={"/netflix-clone/profile"}>
            <img
              className="avatar"
              src="https://media.tenor.com/sgQ73oidu1wAAAAC/netflix-avatar-smile.gif"
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
