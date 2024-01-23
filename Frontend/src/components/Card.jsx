import React, { memo, useEffect, useMemo, useState } from "react";

import Player from "./Player";

import { useSelector } from "react-redux";

import { moviesService } from "../services/moviesService";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { IoCloseOutline } from "react-icons/io5";
import { MuteIcon, VolumeHighIcon } from "@vidstack/react/icons";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { IoMdPlay } from "react-icons/io";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { IoPauseSharp } from "react-icons/io5";

import { isMovieTrailerPaused } from "../store/actions/movie.action";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

const Card = memo(
  ({ movie, addMovieMyList, removeMovieMyList, mobileFilter }) => {
    const baseUrl = "https://image.tmdb.org/t/p/original/";

    const myList = useSelector((state) => state.movieModule.movies);
    const isMobileMode = useSelector((state) => state.userModule.mobileMode);

    const [isHoverd, setIsHoverd] = useState(false);
    const [isFirstRun, setIsFirstRun] = useState(true);
    const [isLiked, setIsLiked] = useState(Math.random() > 0.5 ? true : false);
    const [isHoverTrailerPaused, setisHoverTrailerPaused] = useState(true);

    const [movieTrailer, setMovieTrailer] = useState(null);
    const [isMuted, setIsMuted] = useState(true);

    const [hoverTimeoutId, setHoverTimeoutId] = useState(null);
    const [trailerTimeoutId, setTrailerTimeoutId] = useState(null);

    useEffectUpdate(() => {
      if (isHoverd) {
        loadMovieTrailer(2000);
      } else {
        clearTimeout(trailerTimeoutId);
      }
    }, [isHoverd]);

    function loadMovieTrailer(time = 5000) {
      const id = setTimeout(async () => {
        const fetchedMovieTrailer = await moviesService.getMovieTrailer(
          movie.name || movie.title
        );
        isMovieTrailerPaused(true);
        setMovieTrailer(fetchedMovieTrailer);
        // setMovieTrailer("youtube/_cMxraX_5RE"); //for dev
      }, time);
      setTrailerTimeoutId(id);
    }

    function formatGenre(genreId) {
      switch (genreId) {
        case 28:
          return "Action";
        case 12:
          return "Adventure";
        case 16:
          return "Animation";
        case 35:
          return "Comedy";
        case 80:
          return "Crime";
        case 99:
          return "Documentary";
        case 18:
          return "Drama";
        case 10751:
          return "Family";
        case 14:
          return "Fantasy";
        case 36:
          return "History";
        case 27:
          return "Horror";
        case 10402:
          return "Music";
        case 9648:
          return "Mystery";
        case 10749:
          return "Romance";
        case 878:
          return "Science Fiction";
        case 10770:
          return "TV Movie";
        case 53:
          return "Thriller";
        case 10752:
          return "War";
        case 37:
          return "Western";
        default:
          return "General";
      }
    }

    function handleMouseEnter(movieName) {
      const id = setTimeout(() => {
        setIsHoverd(movieName);
        setIsFirstRun(false);
      }, 600);
      setHoverTimeoutId(id);
    }

    function handleMouseOut(value) {
      setMovieTrailer(value);
      clearTimeout(hoverTimeoutId);
      isMovieTrailerPaused(false);
      setTimeout(setIsHoverd, 200, false);
    }

    const handleToggleMute = () => {
      setIsMuted((prevValue) => !prevValue);
    };

    function onEndedTrailer(value) {
      setMovieTrailer(value);
    }

    const isOnMyList = useMemo(() => {
      return myList?.some((m) => m.id === movie.id);
    }, [myList]);

    useEffectUpdate(() => {
      if (isHoverd && isMobileMode) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isHoverd]);

    return (
      <>
        {isHoverd && isMobileMode && (
          <div className="backdrop" onClick={() => handleMouseOut(null)}></div>
        )}

        <div
          className={"card-container"}
          onMouseEnter={() => handleMouseEnter(movie.name || movie.title)}
          onMouseLeave={!isMobileMode ? () => handleMouseOut(null) : null}
        >
          <img
            src={`${baseUrl + movie.backdrop_path}`}
            className={`poster ${mobileFilter ? "mobile" : ""}`}
          />

          <div
            className={`hover ${
              isHoverd ? "show" : isFirstRun ? "" : "not-shown"
            }`}
          >
            {isHoverd && (
              <>
                <div className="image-video-container">
                  <IoCloseOutline
                    className="close-btn"
                    onClick={() => handleMouseOut(null)}
                  />
                  {!movieTrailer && (
                    <LazyLoadImage
                      src={`${baseUrl + movie.backdrop_path}`}
                      alt=""
                      effect="blur"
                    />
                  )}

                  {movieTrailer && (
                    <>
                      <Player
                        movieTrailer={movieTrailer}
                        isMuted={isMuted}
                        onEndedTrailer={onEndedTrailer}
                        isHoverTrailerPaused={isHoverTrailerPaused}
                      />
                      <div className="trailer-btns">
                        <button
                          className="video-btn toggle-mute"
                          onClick={handleToggleMute}
                        >
                          {isMuted ? (
                            <MuteIcon size={20} />
                          ) : (
                            <VolumeHighIcon size={20} />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <h1 className="title">{movie.title || movie.name}</h1>

                <div className="hover-btns">
                  <div className="left">
                    {isHoverTrailerPaused ? (
                      <IoMdPlay
                        size={30}
                        className="play-btn"
                        onClick={() => setisHoverTrailerPaused(false)}
                      />
                    ) : (
                      <IoPauseSharp
                        size={30}
                        className="pause-btn"
                        onClick={() => setisHoverTrailerPaused(true)}
                      />
                    )}

                    {!isOnMyList ? (
                      <AddIcon
                        onClick={() => addMovieMyList(movie)}
                        className="plus-btn"
                      />
                    ) : (
                      <DoneIcon
                        onClick={() => removeMovieMyList(movie.id)}
                        className="v-btn"
                      />
                    )}
                    {isLiked ? (
                      <ThumbUpIcon
                        onClick={() => setIsLiked(false)}
                        className="unlike-btn"
                      />
                    ) : (
                      <ThumbDownAltIcon
                        onClick={() => setIsLiked(true)}
                        className="like-btn"
                      />
                    )}
                  </div>
                </div>

                <div className="genre-container">
                  {movie?.genre_ids.slice(0, 3).map((genreId, i) => (
                    <h4 key={genreId}>{formatGenre(genreId)}</h4>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default Card;
