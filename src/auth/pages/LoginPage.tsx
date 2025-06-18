import { Google, Login } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
	return (
		<AuthLayout title="Login">
			<form>
				<Grid container direction="column" spacing={1}>
					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="email"
							label="email"
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

					<Grid container sx={{ mt: 2 }} spacing={2}>
						<Grid
							sx={{
								gridColumn: { xs: 'span 12', sm: 'span 6' },
								width: '100%',
							}}
						>
							<Button
								fullWidth
								sx={{ backgroundColor: 'secondary.main' }}
								variant="contained"
							>
								<Login />
								<Typography sx={{ ml: 1 }}>Log In</Typography>
							</Button>
						</Grid>
						<Grid
							sx={{
								gridColumn: { xs: 'span 12', sm: 'span 6' },
								width: '100%',
							}}
						>
							<Button
								fullWidth
								sx={{ backgroundColor: 'secondary.main' }}
								variant="contained"
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Sign in</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" sx={{ justifyContent: 'end', mt: 2 }}>
						<Link
							component={RouterLink}
							to="/auth/register"
							sx={{ color: 'inherit' }}
						>
							Create an account
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
