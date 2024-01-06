import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Row from "./Row";
import Profile from "../pages/Profile";
export default function MobileProfile() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const movies = useSelector((state) => state.movieModule.movies);

  const [isProfileDetails, setIsProfileDetails] = useState(false);

  useEffect(() => {
    if (isProfileDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isProfileDetails]);

  return (
    <>
      {isProfileDetails && (
        <div
          className="backdrop"
          onClick={() => setIsProfileDetails(false)}
        ></div>
      )}

      <div
        className={`profile-details-container ${
          isProfileDetails ? "show" : ""
        }`}
      >
        <header>
          <h1>Profile</h1>
          <CloseIcon onClick={() => setIsProfileDetails(false)} />
        </header>
        <Profile />
      </div>

      <div
        className="mobile-profile"
        style={{ transform: isProfileDetails ? "scale(0.8)" : "none" }}
      >
        <div className="user-container">
          <RxAvatar className="avatar" size={50} />
          <div
            className="user-details"
            onClick={() => setIsProfileDetails(true)}
          >
            <h5>{user.email}</h5>
            <IoIosArrowDown />
          </div>
        </div>
        <div className="mobile-row-container">
          <Row filteredMovies={movies} title="My List" />
        </div>
      </div>
    </>
  );
}
