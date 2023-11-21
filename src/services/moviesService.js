import axios from "axios";

const cacheKey = 'caching'
let cache = localStorage.getItem(cacheKey)
cache = cache ? JSON.parse(cache) : {}

const API_KEY = '1ded769ef93b775933fada2149c582f3'
const baseURL = 'https://api.themoviedb.org/3'

const requests = {
    fetchTrending: `/tending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&woth_networks=213`,
    fectTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrowMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export async function getMovies(moviesGenre) {
    let req = null
    switch (moviesGenre) {
        case 'fetchTrending':
            req = `/trending/all/week?api_key=${API_KEY}&language=en-US`
            break;
        case 'fetchNetflixOriginals':
            req = `/discover/tv?api_key=${API_KEY}&woth_networks=213`
            break;
        case 'fetchTopRated':
            req = `/movie/top_rated?api_key=${API_KEY}&language=en-US`
            break;
        case 'fetchActionMovies':
            req = `/discover/movie?api_key=${API_KEY}&with_genres=28`
            break;
        case 'fetchComedyMovies':
            req = `/discover/movie?api_key=${API_KEY}&with_genres=35`
            break;
        case 'fetchHorrowMovies':
            req = `/discover/movie?api_key=${API_KEY}&with_genres=27`
            break;
        case 'fetchRomanceMovies':
            req = `/discover/movie?api_key=${API_KEY}&with_genres=10749`
            break;
        case 'fetchDocumentariesMovies':
            req = `/discover/movie?api_key=${API_KEY}&with_genres=99`
            break;

        default:
            req = `/tending/all/week?api_key=${API_KEY}&language=en-US`
            break;
    }

    if (cache[moviesGenre]) {
        console.log('return from cache ' + moviesGenre)
        return cache[moviesGenre]
    }
    const url = `${baseURL + req}`
    const res = await axios.get(url)

    cache[moviesGenre] = res.data.results
    localStorage.setItem(cacheKey, JSON.stringify(cache))
    return res.data.results
}

export const moviesService = {
    getMovies,
}
