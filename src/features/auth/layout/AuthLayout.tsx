import { Grid, Typography } from '@mui/material';

type Props = {
	children: React.ReactNode;
	title: string;
};
export const AuthLayout = ({ children, title }: Props) => {
	return (
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
			<Grid
				className="animate__animated animate__fadeIn"
				sx={{
					gridColumn: { xs: 'span 12' },
					background: 'white',
					padding: 3,
					borderRadius: 2,
					boxShadow: 4,
					maxWidth: { xs: '100%', sm: '400px' },
					margin: '0 auto',
					width: { md: 450 },
				}}
			>
				<Typography variant="h5" sx={{ mb: 1 }}>
					{title}
				</Typography>
				{children}
			</Grid>
		</Grid>
	);
};
