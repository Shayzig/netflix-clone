import axios from "axios";
import { httpService } from './http.service.js'

export const moviesService = {
    getMoviesByGenre,
    getMovieTrailer,
    getMovies,
    query,
    getById,
    save,
    remove
}
window.cs = moviesService

const cacheKey = 'caching'
let cache = localStorage.getItem(cacheKey)
cache = cache ? JSON.parse(cache) : {}

const API_KEY = '1ded769ef93b775933fada2149c582f3'
const baseURL = 'https://api.themoviedb.org/3'


export const requests = [
    { fetch: `fetchTrending`, title: 'Tranding Now' },
    { fetch: `fetchNetflixOriginals`, title: 'NETFLIX ORIGINALS' },
    { fetch: `fetchTopRated`, title: 'Top Rated' },
    { fetch: `fetchActionMovies`, title: 'Action Movies' },
    { fetch: `fetchComedyMovies`, title: 'Comedy Movies' },
    { fetch: `fetchHorrowMovies`, title: 'Horror Movies' },
    { fetch: `fetchRomanceMovies`, title: 'Romance Movies' },
    { fetch: `fetchDocumentariesMovies`, title: 'Documentaries Movies' },
]

export async function getMoviesByGenre(moviesGenre) {
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
        // console.log('return from cache ' + moviesGenre)
        return cache[moviesGenre]
    }
    const url = `${baseURL + req}`
    const res = await axios.get(url)

    cache[moviesGenre] = res.data.results
    localStorage.setItem(cacheKey, JSON.stringify(cache))
    return res.data.results
}

export async function getMovieTrailer(movieName) {
    try {
        if (cache[movieName + 'Trailer']) {
            console.log('return from cache ', movieName + ' ' + 'Trailer');
            return cache[movieName + 'Trailer'];
        }

        const apiKey = "AIzaSyDTuJQgjSCqqzQnk7cdZOHrPi8nZqqBTHs";
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
                movieName + "trailer"
            )}&part=snippet&type=video&key=${apiKey}&maxResults=1`
        );

        const videoId = response.data.items[0]?.id.videoId || "No trailer found";
        const link = `https://www.youtube.com/watch?v=${videoId}&fs=0`;

        cache[movieName + 'Trailer'] = link;
        return link;
    } catch (error) {
        console.error("Error fetching trailer:", error);
    }
}

export async function getMovies(filterBy) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filterBy}`;

    if (cache[filterBy]) {
        // console.log('return from cache ' + moviesGenre)
        return cache[filterBy]
    }
    const res = await axios.get(url)

    cache[filterBy] = res.data.results
    localStorage.setItem(cacheKey, JSON.stringify(cache))
    return res.data.results
}

async function query() {
    return httpService.get('movies')
}

function getById(movieId) {
    return httpService.get(`movies/${movieId}`)
}

async function remove(movieId) {
    return httpService.delete(`movies/${movieId}`)
}

async function save(movie) {
    var savedmovie
    if (movie._id) {
        savedmovie = await httpService.put(`movies/${movie._id}`, movie)
    } else {
        savedmovie = await httpService.post('movies', movie)
    }
    return savedmovie
}



