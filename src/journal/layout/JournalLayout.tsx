import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';

type Props = {
	children?: React.ReactNode;
};

const drawerWidth = 240;

export const JournalLayout = ({ children }: Props) => {
	return (
		<Box
			className="animate__animated animate__fadeIn"
			sx={{ display: 'flex', height: '100%' }}
		>
			<Navbar drawerWidth={drawerWidth} />
			<Sidebar drawerWidth={drawerWidth} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 1,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
