import { CloseOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { journalActions } from '../../../../../store/journal/journalSlice';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type Props = {
	isNoteEmpty: boolean;
};

export const CloseNoteButton = ({ isNoteEmpty }: Props) => {
	const { isSaving, activeNote } = useSelector(
		(state: RootState) => state.journal
	);
	const dispatch = useAppDispatch();

	const onClosingNote = () => {
		if (isSaving) return;

		if (isNoteEmpty) {
			dispatch(journalActions.deleteNote(activeNote!));
			toast.info('Note deleted. No content to save');
		}
		dispatch(journalActions.closeNote());
	};

	return (
		<>
			<Button
				size="large"
				onClick={() => onClosingNote()}
				sx={{ px: 3, py: 2, alignItems: 'center' }}
			>
				<CloseOutlined />
				Close
			</Button>
		</>
	);
};
