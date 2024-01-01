export const ADD_MOVIE = 'ADD_MOVIE'
export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const PAUSE_MOVIE_TRAILER = 'PAUSE_MOVIE_TRAILER'
const initialState = {
    movies: [],
    filterby: { movie: '' },
    isMovieTrailerPlay: false
}

export function movieReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_MOVIES:
            return {
                ...state,
                movies: action.movies
            }

        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.movie]
            }

        case REMOVE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movie => movie._id !== action.movieId)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterby: action.filterby
            }
        case PAUSE_MOVIE_TRAILER:
            return {
                ...state,
                isMovieTrailerPlay: action.boolean
            }
        default:
            return state;
    }
}