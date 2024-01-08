import { moviesService } from "../../services/moviesService";
import { ADD_MOVIE, REMOVE_MOVIE, SET_MOVIES, SET_FILTER_BY, PAUSE_MOVIE_TRAILER, SET_MOVIES_BY_GENRE } from "../reducers/movie.reducer";
import { store } from "../store";
import { debounce } from "lodash";


export async function getMyListMovies() {
    try {
        const movies = await moviesService.query()

        const action = {
            type: SET_MOVIES,
            movies
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
export async function loadMoviesByGenre() {
    try {
        const movies = await moviesService.getMoviesByGenre()
        const action = {
            type: SET_MOVIES_BY_GENRE,
            movies
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
export async function addMovie(m) {
    try {
        const movie = await moviesService.save(m)
        const action = {
            type: ADD_MOVIE,
            movie
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}
export async function removeMovie(movieId) {
    const movie = moviesService.remove(movieId)
    try {
        const action = {
            type: REMOVE_MOVIE,
            movieId
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }

}
export const setFilterBy = (filterby) => {
    const action = {
        type: SET_FILTER_BY,
        filterby,
    };
    store.dispatch(action);
};

export function isMovieTrailerPaused(boolean) {
    const action = {
        type: PAUSE_MOVIE_TRAILER,
        boolean
    }
    store.dispatch(action)
}

export const setDebouncedFilterBy = debounce((filterby) => {
    setFilterBy(filterby);
}, 2000);
