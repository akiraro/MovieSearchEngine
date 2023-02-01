import { MovieContext } from "../../hooks/MovieContext"
import { useContext } from "react"
import { Paper, Table, TableRow, TableContainer, TableBody, TableCell, TableHead, TablePagination, Box, Typography } from "@mui/material"


const MovieList = ({setIsModalOpen}) => {
	const { isLoading, setMovie, movies, moviesMeta, pagination, setPagination } = useContext(MovieContext)
	const rowStyles = {
		"&:hover": {
			opacity: 0.7,
			cursor: 'pointer'
		},
		'&:last-child td, &:last-child th': { border: 0 }
	}
	const handleChangePage = (e, page) => {
		setPagination({...pagination, page: page})
	}

	const handleChangeRowsPerPage = (e) => {
		setPagination({page: 0, size: parseInt(e.target.value, 10)})
	}

	const handleOnClick = (movie) => {
		setMovie(movie)
		setIsModalOpen(true)
	}

	if (movies.length === 0 || isLoading) {
		return (
			<Box>
				<Typography variant="subtitle1">{isLoading ? 'Loading...' : 'No Data'}</Typography>
			</Box>
		)
	}

	return (
		<Paper>
			<TableContainer>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Title</TableCell>
							<TableCell align="left">Original Language</TableCell>
							<TableCell align="left">Release Date</TableCell>
							<TableCell align="left">Rating</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{movies.map((row) => (
							<TableRow key={row.id} sx={rowStyles} onClick={() => handleOnClick(row)}>
								<TableCell component="th" scope="row">
									{row.title || 'N/A'}
								</TableCell>
								<TableCell align="left">{row.original_language || 'N/A'}</TableCell>
								<TableCell align="left">{row.release_date || 'N/A'}</TableCell>
								<TableCell align="left">{row.vote_average || 'N/A'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={moviesMeta.total}
				rowsPerPage={pagination.size}
				page={pagination.page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}

export default MovieList