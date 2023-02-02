import { CardMedia, Typography, Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useContext, useMemo, useState } from "react"
import { MovieContext } from "../../hooks/MovieContext"

const MovieComponent = ({ movie }) => {
	const [hoverStyle, setHoverStyle] = useState({
		height: "400px", width: "250px", opacity: 0,
		position: 'absolute', top: '0px', backgroundColor: 'rgba(17,17,17,.8)', color: '#ffff',
		transition: '0.3s', borderRadius: '10px'
	})
	return (
		<Box sx={{ width: "250px", height: "450px", m: 2, position: 'relative' }}
			onMouseEnter={() => setHoverStyle({ ...hoverStyle, opacity: 1 })}
			onMouseLeave={() => setHoverStyle({ ...hoverStyle, opacity: 0 })}
		>
			<Box sx={{ width: 'fit-content', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', backgroundColor: parseInt(movie.imDbRating, 10) >= 5 ? 'green': 'red', borderRadius: '10px', color: '#ffff', fontWeight: 700 }}>{movie.imDbRating || 'N/A'}</Box>
			<CardMedia
				component="img"
				image={movie.image}
				alt="Movie Banner"
				sx={{ height: "400px", width: "250px", borderRadius: '10px', boxShadow: '0 0 22px -3px #000' }}
			/>
			<Box sx={hoverStyle}>
				<Box sx={{ p: 3 }}>
					<Typography sx={{ mb: 3 }} variant="h5">{movie.title}</Typography>
					<Box sx={{ mb: 3 }}>{movie.plot}</Box>
					<Box>{movie.runtimeStr}</Box>
				</Box>
			</Box>
			<Typography noWrap variant="h5" sx={{ fontWeight: 700 }}>{movie.title}</Typography>
		</Box>
	)
}

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
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{movies.slice(START_INDEX, END_INDEX).map((movie) => (
					<MovieComponent key={movie.id} movie={movie} />
				))}
			</Box>
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