import { CloseOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { journalActions } from '../../../../../store/journal/journalSlice';
import { useAppDispatch } from '../../../../../store/store';
type Props = {
	isSaving: boolean;
};
export const CloseNoteButton = ({ isSaving }: Props) => {
	const dispatch = useAppDispatch();

	// --- Close Note ---
	const onClosingNote = () => {
		dispatch(journalActions.closeNote());
	};
	return (
		<>
			<Button
				size="large"
				disabled={isSaving}
				onClick={() => onClosingNote()}
				sx={{ px: 3, py: 2, alignItems: 'center' }}
			>
				<CloseOutlined />
				Close
			</Button>
		</>
	);
};
