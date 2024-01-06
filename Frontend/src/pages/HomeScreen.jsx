import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import Banner from "../components/Banner";
import { moviesService, requests } from "../services/moviesService";
import Row from "../components/Row";

const withAuth = (Component) => (props) => {
  const isUserSub = useSelector((state) => state.userModule.isUserSub);

  if (!isUserSub && isUserSub !== null) {
    return <Navigate to="/profile" />;
  }

  return <Component {...props} />;
};

const HomeScreen = () => {
  const filterBy = useSelector((state) => state.movieModule.filterby);
  const [movies, setMovies] = useState(null);

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

  return (
    <div className="home-screen">
      <Banner />
      <div className="rows-container">
        {filterBy.movie !== "" ? (
          <Row title="Your search" filteredMovies={movies} />
        ) : (
          <>
            {requests.map((req) => (
              <Row key={req.title} title={req.title} fetchUrl={req.fetch} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const HomeScreenWithAuth = withAuth(HomeScreen);

export default HomeScreenWithAuth;
