import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { moviesService, requests } from "../services/moviesService";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useSelector } from "react-redux";
import RenderIfVisible from "react-render-if-visible";

export default function HomeScreen() {
  const filterBy = useSelector((state) => state.movieModule.filterby);
  const [movies, setMovies] = useState(null);
  const mobileMode = useSelector((state) => state.userModule.mobileMode);

  useEffectUpdate(() => {
    loadMovies(filterBy.movie);
  }, [filterBy]);

  async function loadMovies(filterBy) {
    try {
      const movies = await moviesService.getMovies(filterBy);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="home-screen">
      <Banner />
      <div className="rows-container">
        {filterBy.movie !== "" ? (
          <Row title="Your search" filteredMovies={movies} />
        ) : (
          <>
            {requests.map((req) => (
              <Row
                key={req.title}
                title={req.title}
                fetchUrl={req.fetch}
                stayRendered={true}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
