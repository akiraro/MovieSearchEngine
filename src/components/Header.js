import { Box, Typography, Link } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
const Header = () => {

	return (
		<Box sx={{width: '100%', backgroundColor: '#145DA0', height: '50px', display: 'flex', alignItems: 'center', padding: '0px 10px', boxShadow: 'inset 0 0 25px #0C2D48'}}>
			<Link href="http://github.com/akiraro"><GitHubIcon sx={{color: '#ffff'}}/></Link>
			<Box sx={{ paddingLeft: '10px'}}>
				<Typography sx={{color: '#ffff', fontWeight: 600}} variant="h5">Movie Search Engine</Typography>
			</Box>
		</Box>
	)
}

export default Header