import { Link as RouterLink } from 'react-router';
import { useRegister } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import {
	Grid,
	TextField,
	Button,
	Typography,
	Link,
	Alert,
} from '@mui/material';
import { AppRegistration } from '@mui/icons-material';

export const RegisterPage = () => {
	const {
		errorMessage,
		errors,
		handleSubmit,
		onSubmit,
		register,
		isCheckingAuth,
	} = useRegister();

	return (
		<AuthLayout title="Register">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" spacing={1}>
					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="displayName"
							fullWidth
							label="Name"
							placeholder="John Doe"
							type="text"
							{...register('displayName', {
								required: 'Name required',
								minLength: { value: 1, message: 'Invalid length' },
								pattern: {
									value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/,
									message: 'Invalid name',
								},
							})}
							error={!!errors.displayName}
							helperText={errors.displayName?.message}
						/>
					</Grid>

					<Grid sx={{ gridColumn: { xs: 'span 12' }, mt: 1 }}>
						<TextField
							autoComplete="email"
							fullWidth
							label="Email"
							placeholder="example@gmail.com"
							type="email"
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

					{/* Alert error */}
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

					{/* Create account button */}
					<Grid
						sx={{
							gridColumn: { xs: 'span 12', sm: 'span 6' },
							width: '100%',
							mt: 2,
						}}
					>
						<Button
							disabled={isCheckingAuth}
							type="submit"
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
