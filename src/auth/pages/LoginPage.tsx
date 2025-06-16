import { Box, Button, Grid, TextField, Typography } from '@mui/material';

export const LoginPage = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
		>
			<Grid
				item
				xs={3}
				sx={{
					backgroundColor: 'white',
					padding: 3,
					borderRadius: 2,
					boxShadow: 4,
				}}
			>
				<Typography variant="h5" sx={{ mb: 1 }}>
					Login
				</Typography>
				<form>
					<Grid container direction="column">
						<Grid item xs={12} sx={{ mt: 1 }}>
							<TextField
								label="Email"
								type="email"
								placeholder="example@gmail.com"
								fullWidth
							/>
						</Grid>

						<Grid item xs={12} sx={{ mt: 1 }}>
							<TextField
								label="Password"
								type="password"
								placeholder=""
								fullWidth
							/>
						</Grid>

						<Grid container direction="row" sx={{ mt: 2 }} spacing={2}>
							<Grid item>
								<Button sx={{ backgroundColor: 'secondary.main' }}>
									Log In
								</Button>
							</Grid>
							<Grid itme>
								<Button sx={{ backgroundColor: 'secondary.main' }}>
									Register
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
