import React from "react";
import Row from "./Row";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const withAuth = (Component) => (props) => {
  const isUserSub = useSelector((state) => state.userModule.isUserSub);

  if (!isUserSub && isUserSub !== null) {
    return <Navigate to="/profile" />;
  }

  return <Component {...props} />;
};

const MyList = () => {
  const movies = useSelector((state) => state.movieModule.movies);

  return (
    <div className="my-list-container">
      <h4 className="list-title">My List</h4>
      <Row filteredMovies={movies} />
    </div>
  );
};

const MyListWithAuth = withAuth(MyList);

export default MyListWithAuth;
