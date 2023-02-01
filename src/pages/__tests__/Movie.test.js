import '@testing-library/jest-dom'
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Movie from '../Movie'
import MovieService from '../../services/MovieService'


it('renders without any error', () => {
	render(<Movie/>)
	const headerElement = screen.getByRole('heading', {  name: /movie search engine/i})
	expect(headerElement).toBeInTheDocument()
})

describe('Movie component able to search properly', () => {
	beforeEach(async() => {
		jest.spyOn(MovieService, 'getMovies').mockReturnValue(Promise.resolve({page: 1, size: 10, items:[{"original_title":"Puss in Boots: The Last Wish","id":315162,"original_language":"en","vote_average":8.6,"title":"Puss in Boots: The Last Wish","poster_path":"/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg","release_date":"2022-12-21","overview":"Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives."}]}))
		await act(async () => render(<Movie/>))
	})

	it('shows movie based on the search', async () => {
		const searchElement = screen.getByRole('textbox', {  name: /search movies/i})
		await userEvent.type(searchElement, "Puss in Boot{enter}", {delay: 1})

		const posterElement = await screen.findByRole('heading', {  name: /puss in boots: the last wish/i})
		expect(MovieService.getMovies).toBeCalledWith(expect.objectContaining({search: "Puss in Boot"}))
		expect(posterElement).toHaveTextContent('Puss in Boots: The Last Wish')
	})
})

describe('Movie component handles error properly', () => {
	beforeEach(async() => {
		jest.spyOn(MovieService, 'getMovies').mockReturnValue(Promise.reject(new Error("Network Error")))
		await act(async () => render(<Movie/>))
	})

	it('shows no data when API fails', async () => {
		const headerElement = await screen.findByRole('heading', {  name: /no data/i})
		expect(headerElement).toBeInTheDocument()
	})
})
