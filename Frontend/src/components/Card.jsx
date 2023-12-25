import React, { memo, useEffect, useMemo, useState } from "react";
import { IoCheckmark, IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { moviesService } from "../services/moviesService";
import { MuteIcon, VolumeHighIcon } from "@vidstack/react/icons";
import { useSelector } from "react-redux";
import Player from "./Player";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = memo(
  ({ movie, addMovieMyList, removeMovieMyList, mobileFilter }) => {
    const baseUrl = "https://image.tmdb.org/t/p/original/";

    const mobileMode = useSelector((state) => state.userModule.mobileMode);
    const myList = useSelector((state) => state.movieModule.movies);

    const [isHoverd, setIsHoverd] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [movieTrailer, setMovieTrailer] = useState(null);
    const [isMuted, setIsMuted] = useState(true);

    async function loadMovieTrailer(time = 5000) {
      setTimeout(async () => {
        // const fetchedMovieTrailer = await moviesService.getMovieTrailer(
        //   movie.name || movie.title
        // );

        // setMovieTrailer(fetchedMovieTrailer);
        // setIsEndTrailer(false);
        setMovieTrailer("youtube/_cMxraX_5RE"); //for dev
      }, time);
    }

    useEffect(() => {
      if (isHoverd) {
        // console.log("for dev");
        loadMovieTrailer(2000);
      }
    }, [isHoverd]);

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
      setIsHoverd(movieName);
    }

    function handleMouseOut(value) {
      setIsHoverd(false);
      setMovieTrailer(value);
    }

    const handleToggleMute = () => {
      setIsMuted((prevValue) => !prevValue);
    };

    function onEndedTrailer(value) {
      setMovieTrailer(value);
    }

    function isOnMyList() {
      return myList?.some((m) => m.id === movie.id);
    }

    useMemo(() => {
      const body = document.querySelector("body");

      if (isHoverd) {
        body.style.overflowX = "clip";
      } else {
        body.style.overflow = "auto";
      }

      return () => {
        body.style.overflow = "auto";
      };
    }, [isHoverd]);

    return (
      <div
        className="card-container"
        onMouseEnter={() => handleMouseEnter(movie.name || movie.title)}
        onMouseLeave={() => handleMouseOut(null)}
      >
        <LazyLoadImage
          src={`${baseUrl + movie.backdrop_path}`}
          effect="blur"
          className={`poster ${mobileFilter ? "mobile" : ""} ${
            mobileMode && isHoverd ? "grow" : ""
          }`}
        />

        <div className={`hover ${isHoverd ? "show" : ""}`}>
          <div className="image-video-container">
            <IoCloseOutline
              className="close-btn"
              onClick={() => handleMouseOut(null)}
            />
            {!movieTrailer && (
              <LazyLoadImage src={`${baseUrl + movie.backdrop_path}`} alt="" />
            )}
            {movieTrailer && (
              <>
                <Player
                  movieTrailer={movieTrailer}
                  isMuted={isMuted}
                  onEndedTrailer={onEndedTrailer}
                />
                <div className="trailer-btns">
                  <button
                    className="video-btn toggle-mute"
                    onClick={handleToggleMute}
                  >
                    {isMuted ? <MuteIcon /> : <VolumeHighIcon />}
                  </button>
                </div>
              </>
            )}
          </div>

          <h1 className="title">{movie.title || movie.name}</h1>

          <div className="hover-btns">
            <div className="left">
              <IoPlayCircleSharp className="play-btn" />
              {!isOnMyList() ? (
                <AiOutlinePlus
                  onClick={() => addMovieMyList(movie)}
                  className="plus-btn"
                />
              ) : (
                <IoCheckmark
                  onClick={() => removeMovieMyList(movie.id)}
                  className="v-btn"
                />
              )}
              {isLiked ? (
                <RiThumbDownFill
                  onClick={() => setIsLiked(false)}
                  className="unlike-btn"
                />
              ) : (
                <RiThumbUpFill
                  onClick={() => setIsLiked(true)}
                  className="like-btn"
                />
              )}
            </div>

            <BiChevronDown className="more-btn" />
          </div>

          <div className="genre-container">
            {movie?.genre_ids.map((genreId, i) => (
              <h4 key={genreId}>{formatGenre(genreId)}</h4>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Card;

/* {i !== movie.genre_ids.length - 1 && <div className="dot"></div>} */
