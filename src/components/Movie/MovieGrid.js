import { Grid, CardMedia, Typography, Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useContext, useMemo } from "react"
import { MovieContext } from "../../hooks/MovieContext"

const MovieGrid = () => {
	const { isLoading, movies, pagination, setPagination } = useContext(MovieContext)

	const START_INDEX = 0

	const END_INDEX = useMemo(() => {
		return (pagination.page * pagination.size) + pagination.size
	}, [pagination])

	const gridSX = {
		position: 'relative',
		"&:hover": {
			opacity: 0.7,
			cursor: 'pointer'
		}
	}

	const onLoadMore = () => {
		setPagination({ ...pagination, page: pagination.page + 1 })
	}

	if (isLoading) {
		return (
			<Box>
				<Typography variant="subtitle1">{isLoading ? 'Loading...' : 'No Data'}</Typography>
			</Box>
		)
	}

	return (
		<>
			<Grid container spacing={4} sx={{ justifyContent: 'center' }}>
				{movies.slice(START_INDEX, END_INDEX).map((movie) => (
					<Grid item sx={gridSX} key={movie.id} lg={12 / 5} md={12 / 4} sm={4} xs={6}>
						<Box sx={{ width: "200px" }}>
							<CardMedia
								component="img"
								image={movie.image}
								alt="Movie Banner"
								sx={{ height: "300px", width: "200px", borderRadius: '10px' }}
							/>
							<Typography noWrap variant="subtitle1">{movie.title}</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
			{
				(movies.length === 0 && !isLoading) && (
					<Box>
						<Typography variant="subtitle1">No Data</Typography>
					</Box>
				)
			}
			{END_INDEX < movies.length && !isLoading &&
				<LoadingButton
					onClick={() => { onLoadMore() }}
					loading={false}
					variant="outlined"
					sx={{ mt: 5 }}
				>
					{isLoading ? 'Loading...' : 'Load More'}
				</LoadingButton>
			}
		</>
	)
}

export default MovieGrid