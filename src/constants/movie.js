import { BACKEND_URL, APIKEY } from "./http"

export const MOVIE_SEARCH_ENDPOINT = `${BACKEND_URL}/search/movie?api_key=${APIKEY}`
export const TOP_250_ENDPOINT = `${BACKEND_URL}/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}`