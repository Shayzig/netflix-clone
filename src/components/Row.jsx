import React, { useEffect, useState } from "react";
import { moviesService } from "../services/moviesService";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      const movies = await moviesService.getMovies(fetchUrl);
      setMovies(movies);
    } catch (error) {
      console.log(error, fetchUrl);
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies?.map((movie) => (
          <img
            className={`poster ${isLargeRow && "large"}`}
            key={movie.id}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}
