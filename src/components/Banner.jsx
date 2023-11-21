import React, { useEffect, useState } from "react";
import { moviesService } from "../services/moviesService";

export default function Banner() {
  const [movie, setMovie] = useState(null);

  async function loadBannerMovie() {
    const movies = await moviesService.getMovies("fetchTopRated");
    const movie =
      movies[Math.floor(Math.random() * movies.length - 1)];
    setMovie(movie);
  }

  useEffect(() => {
    loadBannerMovie();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? `${string.slice(0, n)} ...` : string;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="contents">
        <h1 className="title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>

        <div className="buttons">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">My List</button>
        </div>

        <div className="description">{truncate(movie?.overview, 150)}</div>
      </div>

      <div className="fade-bottom"> </div>
    </header>
  );
}
