import React, { useRef, useState, useEffect } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
// import { IoIosSearch } from "react-icons/io";
// import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import Row from "./Row";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { moviesService } from "../services/moviesService";
// import { useForm } from "../customHooks/useForm";
import { useNavigate } from "react-router-dom";
import { setFilterBy } from "../store/actions/movie.action";
import FilterBy from "./FilterBy";
import { useDebounce } from "@uidotdev/usehooks";

export default function MobileFilteredMovies() {
  const filterBy = useSelector((state) => state.movieModule.filterby);
  const debouncedFilterBy = useDebounce(filterBy, 3000);
  // const dispatch = useDispatch();
  // const [register] = useForm(filterBy, setFilterBy);
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  // useEffectUpdate(() => {
  // }, [filterBy]);

  useEffectUpdate(() => {
    loadMovies(debouncedFilterBy.movie);
  }, [debouncedFilterBy]);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.value = filterBy.movie;
  //   }
  // }, [filterBy]);

  async function loadMovies(filterBy) {
    try {
      const movies = await moviesService.getMovies(filterBy);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  // const handleInputChange = (event) => {
  //   // dispatch(setFilterBy({ movie: event.target.value }));
  // };

  function onChangeFilter(filterBy) {
    setFilterBy(filterBy);
  }

  // console.log(filterBy);

  return (
    <div className="filterd-movies">
      <div className="filter-wrapper">
        <button className="back-btn" onClick={() => navigate("/netflix-clone")}>
          <MdOutlineArrowBackIos />
        </button>

        <FilterBy filterBy={filterBy} onChangeFilter={onChangeFilter} />
      </div>
      <div className="movies-wrapper">
        {filterBy.movie && (
          <Row title="Your search" mobileFilter={true} filterdMovies={movies} />
        )}
      </div>
    </div>
  );
}
