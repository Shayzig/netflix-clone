import React from "react";
import Row from "./Row";
import { useSelector } from "react-redux";

export default function MyList() {
  const movies = useSelector((state) => state.movieModule.movies);

  return (
    <div className="my-list-container">
      <h4 className="list-title">My List</h4>
      <Row filteredMovies={movies} />
    </div>
  );
}
