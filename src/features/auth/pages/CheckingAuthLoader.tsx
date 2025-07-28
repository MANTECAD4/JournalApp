import { CircularProgress, Grid } from '@mui/material';

export const CheckingAuthLoader = () => {
	return (
		<>
			<Grid
				container
				spacing={0}
				direction="column"
				justifyContent="center"
				sx={{
					minHeight: '100vh',
					backgroundColor: 'primary.main',
					padding: 4,
					gridColumn: { alignItems: 'center' },
				}}
			>
				<Grid container direction={'row'} justifyContent={'center'}>
					<CircularProgress color="info" />
				</Grid>
			</Grid>
		</>
	);
};
