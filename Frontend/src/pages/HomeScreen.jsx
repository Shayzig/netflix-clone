import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import Banner from "../components/Banner";
import { moviesService } from "../services/moviesService";
import Row from "../components/Row";
import RenderIfVisible from "react-render-if-visible";

const withAuth = (Component) => (props) => {
  const isUserSub = useSelector((state) => state.userModule.isUserSub);
  const mobileMode = useSelector((state) => state.userModule.mobileMode);

  if (!isUserSub && isUserSub !== null) {
    return mobileMode ? (
      <Navigate to="/mobile-profile" />
    ) : (
      <Navigate to="/profile" />
    );
  }

  return <Component {...props} />;
};

const HomeScreen = () => {
  const filterBy = useSelector((state) => state.movieModule.filterby);
  const moviesByGenre = useSelector((state) => state.movieModule.moviesByGenre);
  const [movies, setMovies] = useState(null);

  useEffectUpdate(() => {
    loadFilteredMovies(filterBy.movie);
  }, [filterBy]);

  async function loadFilteredMovies(filterBy) {
    try {
      const movies = await moviesService.getFilteredMovies(filterBy);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="home-screen">
      <Banner moviesByGenre={moviesByGenre} />
      <div className="rows-container">
        {filterBy.movie !== "" ? (
          <Row title="Your search" filteredMovies={movies} />
        ) : (
          Object.entries(moviesByGenre)?.map(([key, value]) => (
            <RenderIfVisible key={key} defaultHeight={400} visibleOffset={50}>
              <Row key={key} title={key} data={value} />
            </RenderIfVisible>
          ))
        )}
      </div>
    </div>
  );
};

const HomeScreenWithAuth = withAuth(HomeScreen);

export default HomeScreenWithAuth;

