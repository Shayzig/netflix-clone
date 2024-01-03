import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import Row from "./Row";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { moviesService } from "../services/moviesService";
import { useNavigate } from "react-router-dom";
import { setFilterBy } from "../store/actions/movie.action";
import FilterBy from "./FilterBy";
import { useDebounce } from "@uidotdev/usehooks";

export default function MobileFilteredMovies() {
  const filterBy = useSelector((state) => state.movieModule.filterby);
  const debouncedFilterBy = useDebounce(filterBy, 3000);

  const [movies, setMovies] = useState(null);

  const navigate = useNavigate();

  useEffectUpdate(() => {
    loadMovies(debouncedFilterBy.movie);
  }, [debouncedFilterBy]);

  async function loadMovies(filterBy) {
    try {
      const movies = await moviesService.getMovies(filterBy);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  function onChangeFilter(filterBy) {
    setFilterBy(filterBy);
  }

  function handleBack() {
    onChangeFilter({ movie: "" });
    navigate("/");
  }

  return (
    <div className="filterd-movies">
      <div className="filter-wrapper">
        <button className="back-btn" onClick={() => handleBack()}>
          <MdOutlineArrowBackIos />
        </button>
        <FilterBy filterBy={filterBy} onChangeFilter={onChangeFilter} />
      </div>
      <div className="movies-wrapper">
        <h2 className="mobile-filter-title">Your Search</h2>
        {filterBy.movie && <Row mobileFilter={true} filteredMovies={movies} />}
      </div>
    </div>
  );
}
