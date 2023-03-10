import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import { Box, Container, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import SearchBar from "../components/Core/SearchBar"
import MovieGrid from "../components/Movie/MovieGrid"
import MovieList from "../components/Movie/MovieList"
import { MovieContext } from "../hooks/MovieContext"
import useMovie from "../hooks/useMovie"
import MovieService from "../services/MovieService"

const Movie = () => {
	const { isLoading, setIsLoading, movies, setMovies, pagination, setPagination } = useMovie()
	const [viewType, setViewType] = useState("grid") // Variable for different view type (Grid / List)
	const [searchStr, setSearchStr] = useState("")
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			setIsLoading(true)
			const request = searchStr === '' ? MovieService.getTop250Movies() : MovieService.searchMovies(searchStr)
			request
				.then((response) => {
					setMovies(response.results)
					setIsLoading(false)
				})
				.catch((error) => console.error(error))
		} else {
			setIsLoading(true)
			MovieService.getTop250Movies()
				.then((response) => {
					setMovies(response.results)
					setIsLoading(false)
				})
				.catch((error) => console.error(error))
		}
		didMountRef.current = true

	}, // eslint-disable-next-line 
	[searchStr]) // Call Movie APIs whenever pagination changes

	const onSearch = (searchText) => {
		setSearchStr(searchText)
		setPagination({ ...pagination, page: 0 })
	}

	return (
		<MovieContext.Provider value={{ isLoading, movies, pagination, setPagination }}>
			<Container maxWidth="lg">
				<Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
					<SearchBar
						placeholder="Enter a movie name"
						aria="search movies"
						onSubmit={onSearch}
						searchOnTextChange={true} />
				</Box>
				<Box>
					<Box sx={{ display: 'flex', flexDirection: 'row-reverse', mb: 2 }}>
						<ToggleButtonGroup
							exclusive
							value={viewType}
							onChange={(e, type) => setViewType(type)}
						>
							<ToggleButton value="grid" aria-label="grid view">
								<GridViewIcon />
							</ToggleButton>
							<ToggleButton value="list" aria-label="list view">
								<ListIcon />
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					{viewType === 'grid' ? <MovieGrid /> : <MovieList />}
				</Box>
			</Container>
		</MovieContext.Provider>
	)
}

export default Movie