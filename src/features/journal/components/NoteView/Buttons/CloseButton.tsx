import { CloseOutlined, WarningAmber } from '@mui/icons-material';
import { Button, Grid, Popover, Typography } from '@mui/material';
import { journalActions } from '../../../../../store/journal/journalSlice';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { startUpdatingNote } from '../../../../../store/journal/thunks';
import { toast } from 'react-toastify';
type Props = {
	draftForm: { title: string; body: string };
	isUpToDate: boolean;
};
export const CloseNoteButton = ({ isUpToDate, draftForm }: Props) => {
	const { isSaving, activeNote } = useSelector(
		(state: RootState) => state.journal
	);
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// --- Close Note ---
	const onClosingNote = () => dispatch(journalActions.closeNote());
	const onSaveNote = () => {
		dispatch(
			startUpdatingNote({
				id: activeNote!.id,
				date: activeNote!.date,
				body: draftForm.body.trim(),
				title: draftForm.title.trim(),
				imageUrls: activeNote!.imageUrls,
			})
		);
		dispatch(journalActions.closeNote());
		toast.success('Note saved.');
	};

	return (
		<>
			{isUpToDate ? (
				<Button
					size="large"
					disabled={isSaving}
					onClick={() => onClosingNote()}
					sx={{ px: 3, py: 2, alignItems: 'center' }}
				>
					<CloseOutlined />
					Close
				</Button>
			) : (
				<>
					<Button
						onClick={(event) => setAnchorEl(event.currentTarget)}
						size="large"
						aria-describedby={id}
						sx={{ px: 3, py: 2, alignItems: 'center' }}
					>
						<CloseOutlined />
						Close
					</Button>
					<Popover
						id={''}
						open={open}
						anchorEl={anchorEl}
						onClose={() => setAnchorEl(null)}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<Grid
							container
							direction={'row'}
							alignItems={'center'}
							sx={{ backgroundColor: 'primary.main', color: 'white', p: 2 }}
						>
							<WarningAmber fontSize="medium" />
							<Typography sx={{ pl: 1 }}>You have unsaved changes.</Typography>
						</Grid>
						<Grid container direction="row" justifyContent="space-around">
							<Button onClick={() => onSaveNote()} size="large" sx={{ py: 2 }}>
								Save
							</Button>
							<Button
								size="large"
								sx={{ py: 1 }}
								onClick={() => onClosingNote()}
							>
								Discard
							</Button>
							<Button
								size="large"
								sx={{ py: 1 }}
								onClick={() => setAnchorEl(null)}
							>
								Cancel
							</Button>
						</Grid>
					</Popover>
				</>
			)}
		</>
	);
};
