import { useAppDispatch, type RootState } from '../../store/store';
import { startCreatingEmptyNote } from '../../store/journal/thunks';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const HomePage = ({ drawerWidth = 240 }) => {
	const { isSaving, activeNote } = useSelector(
		(state: RootState) => state.journal
	);
	const dispatch = useAppDispatch();

	const onCreateNote = () => {
		dispatch(startCreatingEmptyNote());
	};

	return (
		<JournalLayout>
			{activeNote !== null ? <NoteView /> : <NothingSelectedView />}
			{!activeNote && (
				<IconButton
					disabled={isSaving}
					onClick={onCreateNote}
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
			)}
		</JournalLayout>
	);
};
