import React from "react";
import { RxAvatar } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import Row from "./Row";
export default function MobileProfile() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const movies = useSelector((state) => state.movieModule.movies);

  return (
    <div className="mobile-profile">
      <div className="user-container">
        <RxAvatar className="avatar" />
        <div className="user-details">
          <h5>{user.email}</h5>
          <IoIosArrowDown />
        </div>
      </div>
      <div className="mobile-row-container">
        <Row filteredMovies={movies} title="My List" />
      </div>
    </div>
  );
}
