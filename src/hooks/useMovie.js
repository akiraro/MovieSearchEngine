import { useState } from "react"

const useMovie = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [movies, setMovies] = useState([]) // Store list of movies fetch from API
	const [pagination, setPagination] = useState({ // Pagination
		page: 0,
		size: 20,
		search: ''
	})

	return {
		isLoading,
		setIsLoading,
		movies,
		setMovies,
		pagination,
		setPagination
	}
}

export default useMovie