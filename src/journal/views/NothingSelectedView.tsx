import { BubbleChartOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
export const NothingSelectedView = () => {
	return (
		<Grid
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
				<BubbleChartOutlined sx={{ fontSize: 100, color: 'white' }} />
			</Grid>
			<Grid sx={{ gridColumn: { xs: 'span 12' } }}>
				<Typography color="white" variant="h6">
					{' '}
					Select or create a new entry
				</Typography>
			</Grid>
		</Grid>
	);
};
