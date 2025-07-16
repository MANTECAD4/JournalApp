import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { Add } from '@mui/icons-material';
import { useAppDispatch } from '../../store/store';
import { startCreatingEmptyNote } from '../../store/journal/thunks';

export const HomePage = ({ drawerWidth = 240 }) => {
	const dispatch = useAppDispatch();
	const handleCreateNote = () => {
		dispatch(startCreatingEmptyNote());
	};
	return (
		<JournalLayout>
			{/* <NothingSelectedView /> */}
			<NoteView />
			<IconButton
				onClick={handleCreateNote}
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
