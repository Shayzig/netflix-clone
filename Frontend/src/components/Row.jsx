import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { moviesService } from "../services/moviesService";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import { addMovie, removeMovie } from "../store/actions/movie.action";

const Row = memo(
  ({
    title,
    fetchUrl = "",
    filterdMovies = null,
    mobileFilter,
    OnSetIsHoverd,
  }) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [movies, setMovies] = useState(null);
    let [scroll, setScroll] = useState(0);
    const [isControls, setIsControls] = useState(false);

    const handleDirection = (direction) => {
      const scrollStep = 91.7;

      if (direction === "left" && sliderPosition > 0) {
        setScroll((prevScroll) => (prevScroll += scrollStep));
        setSliderPosition(sliderPosition - 1);
      }
      if (direction === "right" && sliderPosition < 3) {
        setScroll((prevScroll) => (prevScroll -= scrollStep));
        setSliderPosition(sliderPosition + 1);
      }
      if (direction === "right" && sliderPosition === 2) {
        setScroll(0);
        setSliderPosition(0);
      }
      if (direction === "left" && sliderPosition === 0) {
        setScroll(scrollStep * -2);
        setSliderPosition(2);
      }
    };

    useEffect(() => {
      if (!filterdMovies) {
        loadMoviesByGenre();
      } else {
        setMovies(filterdMovies);
      }
    }, [filterdMovies]);

    async function loadMoviesByGenre() {
      try {
        const movies = await moviesService.getMoviesByGenre(fetchUrl);
        setMovies(movies);
      } catch (error) {
        console.log(error, fetchUrl);
      }
    }

    const onAddMovie = useCallback(async (movie) => {
      try {
        await addMovie(movie);
      } catch (error) {
        console.log(error);
      }
    }, []);

    const onRemoveMovie = useCallback(async (movieId) => {
      try {
        await removeMovie(movieId);
      } catch (error) {
        console.log(error);
      }
    });

    if (!movies)
      return (
        <>
          <h2>Lodaing...</h2>
        </>
      );

    return (
      <>
        <h1
          className="category-title"
          style={{ fontSize: mobileFilter ? "30px" : "" }}
        >
          {title}
        </h1>
        <div
          className="row-container"
          onMouseEnter={() => setIsControls(true)}
          onMouseLeave={() => setIsControls(false)}
        >
          <div className="row">
            <div className={`slider-action left ${!isControls ? "none" : ""}`}>
              <AiOutlineLeft
                color="white"
                size={"40px"}
                onClick={() => handleDirection("left")}
              />
            </div>

            <div
              className={`${mobileFilter ? "col" : "slider"} `}
              style={{ left: `${scroll}vw` }}
            >
              {movies?.slice(0, 18).map((movie, index) => (
                <Card
                  addMovieMyList={onAddMovie}
                  removeMovieMyList={onRemoveMovie}
                  key={movie.id}
                  index={index}
                  movie={movie}
                  mobileFilter={mobileFilter}
                  OnSetIsHoverd={OnSetIsHoverd}
                />
              ))}
            </div>

            <div className={`slider-action right ${!isControls ? "none" : ""}`}>
              <AiOutlineRight
                color="white"
                size={"40px"}
                onClick={() => handleDirection("right")}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Row;
