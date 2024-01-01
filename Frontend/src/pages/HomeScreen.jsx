import Banner from "../components/Banner";
import Row from "../components/Row";

import { useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

import { moviesService, requests } from "../services/moviesService";

import { useSelector } from "react-redux";

export default function HomeScreen() {
  const filterBy = useSelector((state) => state.movieModule.filterby);
  const [movies, setMovies] = useState(null);

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
              <Row key={req.title} title={req.title} fetchUrl={req.fetch} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
