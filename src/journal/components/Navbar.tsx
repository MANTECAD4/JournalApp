import { Logout, MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { startLogout } from '../../store/auth/thunks';

type Props = {
	drawerWidth?: number;
};
export const Navbar = ({ drawerWidth = 240 }: Props) => {
	const dispatch = useAppDispatch();

	const onLogout = () => {
		dispatch(startLogout());
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					edge="start"
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuOutlined />
				</IconButton>
				<Grid
					sx={{ width: '100%' }}
					container
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography variant="h6" noWrap component="div">
						JournalApp
					</Typography>
					<Grid container direction="row" alignItems={'center'}>
						<IconButton onClick={onLogout} color="error">
							<Logout />
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
