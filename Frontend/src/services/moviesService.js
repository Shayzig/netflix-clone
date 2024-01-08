import axios from "axios";
import { httpService } from './http.service.js'
import { forEach } from "lodash";

export const moviesService = {
    getMoviesByGenre,
    getMovieTrailer,
    getFilteredMovies,
    query,
    getById,
    save,
    remove
}
window.cs = moviesService

const cacheKey = 'movies'
let cache = localStorage.getItem(cacheKey)
cache = cache ? JSON.parse(cache) : {}

const API_KEY = '1ded769ef93b775933fada2149c582f3'
const baseURL = 'https://api.themoviedb.org/3'


export const requests = [
    { title: 'Tranding Now', fetchUrl: `/trending/all/week?api_key=${API_KEY}&language=en-U` },
    { title: 'NETFLIX ORIGINALS', fetchUrl: `/discover/tv?api_key=${API_KEY}&woth_networks=213` },
    { title: 'Top Rated', fetchUrl: `/movie/top_rated?api_key=${API_KEY}&language=en-US` },
    { title: 'Action Movies', fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
    { title: 'Comedy Movies', fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
    { title: 'Horror Movies', fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=27` },
    { title: 'Romance Movies', fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=10749` },
    { title: 'Documentaries Movies', fetchUrl: `/discover/movie?api_key=${API_KEY}&with_genres=99` },
]

export async function getMoviesByGenre() {
    if (cache['moviesByGenre']) {
        console.log('return from cache - moviesByGenre ')
        return cache['moviesByGenre']
    }

    let res = {};
    try {
        await Promise.all(requests.map(async (req) => {
            const url = `${baseURL + req.fetchUrl}`;
            const resByGenre = await axios.get(url);
            res[req.title] = resByGenre.data.results;
        }));

        cache['moviesByGenre'] = res;
        localStorage.setItem(cacheKey, JSON.stringify(cache));

        return res;
    } catch (error) {
        console.error('Error fetching moviesByGenre:', error);
    }
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

export async function getFilteredMovies(filterBy) {
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



