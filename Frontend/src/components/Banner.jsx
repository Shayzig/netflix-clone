import React, { useEffect, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

import MovieTrailer from "./MovieTrailer";

import { moviesService } from "../services/moviesService";
import { addMovie, removeMovie } from "../store/actions/movie.action";

import { PlayIcon } from "@vidstack/react/icons";
import { InfoIcon } from "@vidstack/react/icons";
import { MuteIcon } from "@vidstack/react/icons";
import { MdAdd } from "react-icons/md";
import { VolumeHighIcon } from "@vidstack/react/icons";
import { ReplayIcon } from "@vidstack/react/icons";
import { useSelector } from "react-redux";
import { IoCheckmark } from "react-icons/io5";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [isEndTrailer, setIsEndTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDescription, setIsDescription] = useState(true);

  const mobileMode = useSelector((state) => state.userModule.mobileMode);
  const myList = useSelector((state) => state.movieModule.movies);

  useEffectUpdate(() => {
    if (!mobileMode) {
      // console.log("loaded trailer desktop");
      loadTrailerMovie();
    } else {
      getAverageColor();
    }
  }, [movie]);

  useEffect(() => {
    loadBannerMovie();
  }, []);

  async function getAverageColor() {
    try {
      if (!movie) throw new Error("Movie not available.");

      const fac = new FastAverageColor();
      const movieUrl = movie.backdrop_path;

      const color = await fac.getColorAsync(
        `https://image.tmdb.org/t/p/original${movieUrl}`
      );

      const body = document.querySelector("body");
      const rgbaValues = color.rgba.match(/\d+/g);
      const gradientColor = `linear-gradient(180deg, rgba(${
        rgbaValues[0] - 74
      }, ${rgbaValues[1] - 90}, ${
        rgbaValues[2] - 105
      }, 1 ) 0%, rgba(13, 13, 13, 1) 40%)`;

      body.style.background = gradientColor;
    } catch (error) {
      console.error(error);
    }
  }

  async function loadBannerMovie() {
    try {
      const movies = await moviesService.getMoviesByGenre("fetchTopRated");
      let randomNum = Math.floor(Math.random() * movies.length - 1);
      // const selectedMovie = movies[6]; // for dev
      const selectedMovie = movies[randomNum];
      setMovie(selectedMovie);
    } catch (error) {
      console.error("Error loading banner movie:", error);
    }
  }

  async function loadTrailerMovie(time = 6000) {
    setIsEndTrailer(false);
    setTimeout(async () => {
      const fetchedMovieTrailer = await moviesService.getMovieTrailer(
        movie.name || movie.title
      );
      setMovieTrailer(fetchedMovieTrailer);
      setIsEndTrailer(false);
      setTimeout(() => setIsDescription(false), 5000);
    }, time);
  }

  const truncate = (string, n) => {
    return string?.length > n ? `${string.slice(0, n)} ...` : string;
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  async function onEndedTrailer(value) {
    setMovieTrailer(value);
    setIsEndTrailer((prevValue) => !prevValue);
  }

  function isAdultMovie() {
    return movie?.adult ? "18+" : "16+";
  }

  const addMovieMyList = async () => {
    try {
      await addMovie(movie);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMovieMyList = async () => {
    try {
      const bannerMovie = myList.find((m) => m.id === movie.id);
      await removeMovie(bannerMovie._id);
    } catch (error) {
      console.log(error);
    }
  };

  function isOnMyList() {
    return myList?.some((m) => m.id === movie?.id);
  }

  return (
    <>
      <header className="banner">
        <div className="img-video-container">
          {!movieTrailer && (
            <>
              {mobileMode ? (
                <div className="banner-img">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt="Movie backdrop"
                  />
                </div>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                  alt="Movie backdrop"
                />
              )}
            </>
          )}

          {movieTrailer && (
            <MovieTrailer
              movieTrailer={movieTrailer}
              isMuted={isMuted}
              onEndedTrailer={onEndedTrailer}
            />
          )}
        </div>
        <div className="contents">
          <div className="text-container">
            <h1 className={`title ${isDescription ? "" : "none"}`}>
              {movie?.name || movie?.title || movie?.original_name}
            </h1>

            <div className={`description ${isDescription ? "" : "none"}`}>
              {truncate(movie?.overview, 150)}
            </div>
          </div>

          <div className="buttons">
            <div className="movie-btns">
              <button className="banner-btn">
                <PlayIcon />
                <span onClick={() => pauseMovieTrailer()}>Play</span>
              </button>

              {!mobileMode ? (
                <button className="banner-btn">
                  <InfoIcon />
                  <span>More Info</span>
                </button>
              ) : !isOnMyList() ? (
                <button onClick={() => addMovieMyList()} className="banner-btn">
                  <MdAdd />
                  <span>My List</span>
                </button>
              ) : (
                <button
                  onClick={() => removeMovieMyList()}
                  className="banner-btn"
                >
                  <IoCheckmark />
                  <span>My List</span>
                </button>
              )}
            </div>

            <div className="player-btns">
              {isEndTrailer ? (
                <button
                  className="video-btn replay"
                  onClick={() => loadTrailerMovie(0)}
                >
                  <ReplayIcon size={38} />
                </button>
              ) : (
                <>
                  <button
                    className="video-btn toggle-mute"
                    onClick={handleToggleMute}
                  >
                    {isMuted ? (
                      <MuteIcon size={38} />
                    ) : (
                      <VolumeHighIcon size={38} />
                    )}
                  </button>
                </>
              )}
              <div className="age">{isAdultMovie()}</div>
            </div>
          </div>
        </div>
        {!mobileMode && <div className="fade-bottom"></div>}
      </header>
    </>
  );
}
