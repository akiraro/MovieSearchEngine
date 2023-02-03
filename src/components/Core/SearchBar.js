import SearchIcon from "@mui/icons-material/Search"
import { IconButton, InputBase, Paper } from "@mui/material"
import { useEffect, useState, useRef } from "react"

const SearchBar = ({ placeholder, aria, onSubmit, searchOnTextChange }) => {
	const didMountRef = useRef(false);
	const [searchStr, setSearchStr] = useState('')
	const containerSX = {
		p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, borderRadius: '30px', boxShadow: '0 0 10px -3px #000' 
	}

	// useEffect that triggers when searchStr changes and SearchOnText is true and contains debounce to avoid multiple API calls
	useEffect(() => {
		let delayDebounceFn

		// Make sure searchOnTextChange enabled and not initial render
		if (didMountRef.current && searchOnTextChange) {
			delayDebounceFn = setTimeout(() => {
				handleSearch()
			}, 500)
		}
		didMountRef.current = true

		return () => {
			if (searchOnTextChange) clearTimeout(delayDebounceFn)
		}
		// eslint-disable-next-line 
	}, [searchStr, searchOnTextChange])

	const handleSearch = () => {
		onSubmit(searchStr)
	}

	return (
		<Paper
			sx={containerSX}
		>
			<InputBase
				sx={{ ml: 3, flex: 1 }}
				placeholder={placeholder}
				inputProps={{ 'aria-label': aria }}
				onKeyUp={(e) => {
					// eslint-disable-next-line 
					if (e.key == 'Enter') handleSearch()
				}}
				onChange={(e) => setSearchStr(e.target.value)}
			/>
			<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
				<SearchIcon />
			</IconButton>
		</Paper>
	)

}

export default SearchBar