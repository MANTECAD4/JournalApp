import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';
import { ToastContainer } from 'react-toastify';

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
			<ToastContainer
				position="bottom-right"
				// stacked
				limit={4}
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				// transition="Bounce"
			/>
		</Box>
	);
};
