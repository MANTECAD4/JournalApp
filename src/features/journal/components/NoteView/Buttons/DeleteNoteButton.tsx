import { DeleteOutline } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { DeleteModal } from '../DeleteModal';
import { useState } from 'react';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { toast } from 'react-toastify';
import { startDeletingNote } from '../../../../../store/journal/thunks/startDeletingNote';
import { useSelector } from 'react-redux';
type Props = {
	isUpToDate: boolean;
};
export const DeleteNoteButton = ({ isUpToDate }: Props) => {
	const { isSaving } = useSelector((state: RootState) => state.journal);
	const dispatch = useAppDispatch();

	// --- Delete Note ---
	const onDeleteNote = () => {
		if (!isUpToDate) {
			toast.warn(`You have unsaved changes.`);
			return;
		}
		try {
			dispatch(startDeletingNote());
			toast.success('Note deleted');
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Button
				size="large"
				onClick={() => setIsOpen(true)}
				disabled={isSaving}
				sx={{ px: 3, py: 2, alignItems: 'center', color: 'red' }}
			>
				<DeleteOutline />
				<Typography>Delete</Typography>
			</Button>
			<DeleteModal
				onDeleteNote={onDeleteNote}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
};
