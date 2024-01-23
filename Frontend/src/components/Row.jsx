import React, { memo, useCallback, useEffect, useState } from "react";

import { moviesService } from "../services/moviesService";

import { useSelector } from "react-redux";
import { addMovie, removeMovie } from "../store/actions/movie.action";

import Card from "./Card";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Row = memo(
  ({ title, data, filteredMovies = null, mobileFilter = false }) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [movies, setMovies] = useState(null);
    let [scroll, setScroll] = useState(0);
    const [isControls, setIsControls] = useState(false);
    const isMobileMode = useSelector((state) => state.userModule.mobileMode);
    const myList = useSelector((state) => state.movieModule.movies);
   
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
      if (!filteredMovies) {
        setMovies(data);
      } else {
        setMovies(filteredMovies);
      }
    }, [filteredMovies]);

    const onAddMovie = useCallback(
      async (movie) => {
        try {
          await addMovie(movie);
        } catch (error) {
          console.log(error);
        }
      },
      [myList]
    );

    const onRemoveMovie = useCallback(
      async (movieId) => {
        try {
          const bannerMovie = myList.find((m) => m.id === movieId);
          await removeMovie(bannerMovie._id);
        } catch (error) {
          console.log(error);
        }
      },
      [myList]
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
            {!isMobileMode && movies?.length > 5 && (
              <div
                className={`slider-action left ${!isControls ? "none" : ""}`}
              >
                <AiOutlineLeft
                  color="white"
                  size={"40px"}
                  onClick={() => handleDirection("left")}
                />
              </div>
            )}

            <div
              className={`${mobileFilter ? "col" : "slider"} `}
              style={{ left: `${scroll}vw` }}
            >
              {movies?.slice(0, 18).map((movie) => (
                <Card
                  addMovieMyList={onAddMovie}
                  removeMovieMyList={onRemoveMovie}
                  key={movie.id}
                  movie={movie}
                  mobileFilter={mobileFilter}
                />
              ))}
            </div>
            {!isMobileMode && movies?.length > 5 && (
              <div
                className={`slider-action right ${!isControls ? "none" : ""}`}
              >
                <AiOutlineRight
                  color="white"
                  size={"40px"}
                  onClick={() => handleDirection("right")}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default Row;
