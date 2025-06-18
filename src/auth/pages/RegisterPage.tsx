import { Grid, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

import { AuthLayout } from '../layout/AuthLayout';
import { AppRegistration, Create } from '@mui/icons-material';

export const RegisterPage = () => {
	return (
		<AuthLayout title="Register">
			<form>
				<Grid container direction="column" spacing={1}>
					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="name"
							label="Name"
							type="text"
							placeholder="John Doe"
							fullWidth
						/>
					</Grid>

					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="email"
							label="Email"
							type="email"
							placeholder="example@gmail.com"
							fullWidth
						/>
					</Grid>
					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="current-password"
							label="Password"
							type="password"
							placeholder=""
							fullWidth
						/>
					</Grid>
					<Grid
						sx={{
							gridColumn: { xs: 'span 12', sm: 'span 6' },
							width: '100%',
							mt: 2,
						}}
					>
						<Button
							fullWidth
							sx={{ backgroundColor: 'secondary.main' }}
							variant="contained"
						>
							<AppRegistration />
							<Typography sx={{ ml: 1 }}>Create account</Typography>
						</Button>
					</Grid>
					<Grid container direction="row" sx={{ justifyContent: 'end', mt: 1 }}>
						<Typography sx={{ mr: 1 }}>Already have an account?</Typography>
						<Link component={RouterLink} to="/auth/login" color="inherit">
							Login
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
