import { useSelector } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import type { RootState } from '../../store/store';

type Props = {
	drawerWidth?: number;
};
export const Sidebar = ({ drawerWidth = 240 }: Props) => {
	const { displayName, photoURL } = useSelector(
		(state: RootState) => state.auth
	);
	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth, flexShrink: { sm: 0 } } }}
		>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Toolbar>
					<Avatar
						variant="circular"
						sx={{ bgcolor: '', mr: 1 }}
						alt={displayName}
						src={photoURL}
					/>

					<Typography variant="h6" noWrap component="div">
						My Notes
					</Typography>
				</Toolbar>
				<Divider />
				<List>
					{['January', 'February', 'March', 'April'].map((month) => (
						<ListItem key={month} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TurnedInNot />
								</ListItemIcon>
								<Grid container>
									<ListItemText primary={month} />
									<ListItemText secondary={'Some random text uwuw'} />
								</Grid>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
