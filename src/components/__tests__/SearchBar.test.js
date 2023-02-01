import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SearchBar from '../Core/SearchBar'

const onSubmit = jest.fn()

describe('Test basic search functionality', () => {
	beforeEach(() => {
		render(<SearchBar
			placeholder="Search Movie Title"
			aria="search movies"
			onSubmit={onSubmit}/>)
	})

	test('Input empty on render', () => {
		const searchInputElement = screen.getByRole('textbox', { name: /search movies/i })
		expect(searchInputElement.value).toBe('')
	})

	test('Call onSubmit when user press enter', async () => {
		const searchInputElement = screen.getByRole('textbox', { name: /search movies/i })
		await userEvent.type(searchInputElement, "Puss in Boot{enter}", {delay: 1})
		expect(onSubmit).toBeCalledWith('Puss in Boot',)
	})

	test('onSubmit not is being called when user is typing', async () => {
		const searchInputElement = screen.getByRole('textbox', { name: /search movies/i })
		await userEvent.type(searchInputElement, "Puss in Boot", {delay: 1})
		expect(onSubmit).toHaveBeenCalledTimes(0)
	})
})

describe('Test search functionality with searchOnTextChange', () => {
	beforeEach(() => {
		render(<SearchBar
			placeholder="Search Movie Title"
			aria="search movies"
			searchOnTextChange={true}
			onSubmit={onSubmit}/>)
	})

	test('Input empty on render', () => {
		const searchInputElement = screen.getByRole('textbox', { name: /search movies/i })
		expect(searchInputElement.value).toBe('')
	})

	test('onSubmit is being called once when user finished typing', async () => {
		const searchInputElement = screen.getByRole('textbox', { name: /search movies/i })
		await userEvent.type(searchInputElement, "Puss in Boot", {delay: 1})
		await new Promise((r) => setTimeout(r, 500));
		expect(onSubmit).toHaveBeenCalledTimes(1)
	})
})