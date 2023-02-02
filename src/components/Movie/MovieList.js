import { MovieContext } from "../../hooks/MovieContext"
import { useContext, useMemo } from "react"
import { Paper, Table, TableRow, TableContainer, TableBody, TableCell, TableHead, TablePagination, Box, Typography } from "@mui/material"


const MovieList = () => {
	const { isLoading, movies, pagination, setPagination } = useContext(MovieContext)
	const START_INDEX = useMemo(() => {
		return (pagination.page * pagination.size)
	}, [pagination])
	const END_INDEX = useMemo(() => {
		return (pagination.page * pagination.size) + pagination.size
	}, [pagination])
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
							<TableCell align="left">Rating</TableCell>
							<TableCell align="left">Release Date</TableCell>
							<TableCell align="left">Description</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{movies.slice(START_INDEX, END_INDEX).map((row) => (
							<TableRow key={row.id} sx={rowStyles}>
								<TableCell component="th" scope="row">
									{row.title || 'N/A'}
								</TableCell>
								<TableCell align="left">{row.vote_average || 'N/A'}</TableCell>
								<TableCell align="left">{row.release_date || 'N/A'}</TableCell>
								<TableCell align="left">{row.overview || 'N/A'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={movies.length}
				rowsPerPage={pagination.size}
				page={pagination.page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}

export default MovieList