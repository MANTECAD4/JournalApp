import { CloseOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { journalActions } from '../../../../../store/journal/journalSlice';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';

export const CloseNoteButton = () => {
	const { isSaving } = useSelector((state: RootState) => state.journal);
	const dispatch = useAppDispatch();

	const onClosingNote = () => {
		if (isSaving) return;
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
