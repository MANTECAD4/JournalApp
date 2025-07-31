import { DeleteOutline } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { DeleteNoteModal } from '../DeleteNoteModal';
import { useState } from 'react';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { toast } from 'react-toastify';
import { startDeletingNote } from '../../../../../store/journal/thunks/startDeletingNote';
import { useSelector } from 'react-redux';

export const DeleteNoteButton = () => {
	const { isSaving } = useSelector((state: RootState) => state.journal);
	const dispatch = useAppDispatch();

	// --- Delete Note ---
	const onDeleteNote = () => {
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
			<DeleteNoteModal
				onDeleteNote={onDeleteNote}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
};
