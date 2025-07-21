import { Grid, Typography } from '@mui/material';
import CircularText from '../../ui/components/CircularText/CircularText/CircularText';

export const NothingSelectedView = () => {
	return (
		<Grid
			className="animate__animated animate__fadeIn"
			container
			spacing={0}
			direction="column"
			justifyContent="center"
			alignItems="center"
			sx={{
				minHeight: 'calc(100vh - 80px) ',
				backgroundColor: 'primary.main',
				borderRadius: 5,
			}}
		>
			<Grid sx={{ gridColumn: { xs: 'span 12' } }}>
				<CircularText
					text="JOURNAL*APP*"
					onHover="speedUp"
					spinDuration={20}
					className="custom-class"
				/>
			</Grid>
			<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 2 }}>
				<Typography color="white" variant="h6">
					Select or create a new entry
				</Typography>
			</Grid>
		</Grid>
	);
};
