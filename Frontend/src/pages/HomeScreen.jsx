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
  const [isHoverd, setIsHoverd] = useState(false);

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

  function OnSetIsHoverd(boolean) {
    setIsHoverd(boolean);
  }

  return (
    <div className="home-screen">
      <div className={`drop ${isHoverd ? "show" : ""}`}></div>
      <Banner />

      <div className="rows-container">
        {filterBy.movie !== "" ? (
          <Row
            title="Your serach"
            filterdMovies={movies}
            OnSetIsHoverd={OnSetIsHoverd}
          />
        ) : (
          <>
            <Row
              title="NETFLIX ORIGINALS"
              fetchUrl="fetchNetflixOriginals"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Tranding Now"
              fetchUrl="fetchTrending"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Top Rated"
              fetchUrl="fetchTopRated"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Action Movies"
              fetchUrl="fetchActionMovies"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Comedy Movies"
              fetchUrl="fetchComedyMovies"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Horror Movies"
              fetchUrl="fetchHorrowMovies"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Romance Movies"
              fetchUrl="fetchRomanceMovies"
              OnSetIsHoverd={OnSetIsHoverd}
            />
            <Row
              title="Documentaries Movies"
              fetchUrl="fetchDocumentariesMovies"
              OnSetIsHoverd={OnSetIsHoverd}
            />
          </>
        )}
      </div>
    </div>
  );
}
