import { TurnedInNot } from '@mui/icons-material';
import {
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
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

type Props = {
	drawerWidth?: number;
};
export const Sidebar = ({ drawerWidth = 240 }: Props) => {
	const { displayName } = useSelector((state: RootState) => state.auth);
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
					<Typography variant="h6" noWrap component="div">
						{displayName}
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
