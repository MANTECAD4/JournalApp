import { Google, Login } from '@mui/icons-material';
import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { AuthLayout } from '../layout/AuthLayout';
import { useLogin } from '../../hooks';

export const LoginPage = () => {
	const {
		errors,
		handleSubmit,
		onGoogleSignIn,
		onSubmit,
		register,
		status,
		errorMessage,
	} = useLogin();

	return (
		<AuthLayout title="Login">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" spacing={1}>
					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="email"
							fullWidth
							label="email"
							placeholder="example@gmail.com"
							{...register('email', {
								required: 'An email address is required',
								minLength: { value: 6, message: '' },
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email',
								},
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
							type="email"
						/>
					</Grid>

					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="current-password"
							fullWidth
							label="Password"
							placeholder=""
							type="password"
							{...register('password', {
								required: 'A password is required',
								minLength: { value: 6, message: 'Min 6 characters' },
								pattern: {
									value:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message: 'Invalid password',
								},
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					</Grid>

					{/* Error alert*/}
					<Grid
						display={errorMessage !== '' ? '' : 'none'}
						sx={{
							gridColumn: { xs: 'span 12', sm: 'span 6' },
							width: '100%',
							mt: 2,
						}}
					>
						<Alert severity="error">{errorMessage}</Alert>
					</Grid>

					<Grid container sx={{ mt: 2 }} spacing={2}>
						<Grid
							sx={{
								gridColumn: { xs: 'span 12', sm: 'span 6' },
								width: '100%',
							}}
						>
							<Button
								disabled={status === 'checking'}
								type="submit"
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
								disabled={status === 'checking'}
								onClick={onGoogleSignIn}
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
