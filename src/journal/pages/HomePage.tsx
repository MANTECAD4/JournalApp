import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { Add } from '@mui/icons-material';

export const HomePage = ({ drawerWidth = 240 }) => {
	return (
		<JournalLayout>
			<NothingSelectedView />
			{/* <NoteView /> */}
			<IconButton
				size="large"
				sx={{
					':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					backgroundColor: 'error.main',
					bottom: 50,
					color: 'white',
					position: 'fixed',
					right: 50,
				}}
			>
				<Add sx={{ fontSize: 35 }} />
			</IconButton>
		</JournalLayout>
	);
};
