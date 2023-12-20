import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { moviesService } from "../services/moviesService";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useSelector } from "react-redux";

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
          <Row title="Your serach" filterdMovies={movies} />
        ) : (
          <>
            <Row title="NETFLIX ORIGINALS" fetchUrl="fetchNetflixOriginals" />
            <Row title="Tranding Now" fetchUrl="fetchTrending" />
            <Row
              title="Top Rated"
              fetchUrl="fetchTopRated"
              mobileMode={mobileMode}
            />
            <Row title="Action Movies" fetchUrl="fetchActionMovies" />
            <Row title="Comedy Movies" fetchUrl="fetchComedyMovies" />
            <Row title="Horror Movies" fetchUrl="fetchHorrowMovies" />
            <Row title="Romance Movies" fetchUrl="fetchRomanceMovies" />
            <Row
              title="Documentaries Movies"
              fetchUrl="fetchDocumentariesMovies"
            />
          </>
        )}
      </div>
    </div>
  );
}
