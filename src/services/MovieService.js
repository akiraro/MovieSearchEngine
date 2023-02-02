import { MOVIE_SEARCH_ENDPOINT, TOP_250_ENDPOINT } from '../constants'
import { httpClient } from "../utils/axiosUtil";


const searchMovies = async (searchStr) => {

	return new Promise((resolve, reject) => {
		httpClient.get(MOVIE_SEARCH_ENDPOINT + `?title=${searchStr}`)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				reject(error);
			})
	})
}

const getTop250Movies = async () => {

	return new Promise((resolve, reject) => {
		httpClient.get(TOP_250_ENDPOINT)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				reject(error);
			})
	})
}

const MovieService = {
	searchMovies: searchMovies,
	getTop250Movies: getTop250Movies
}

export default MovieService