import { CloseOutlined, PriorityHigh, WarningAmber } from '@mui/icons-material';
import { Button, Divider, Grid, Popover, Typography } from '@mui/material';
import { journalActions } from '../../../../../store/journal/journalSlice';
import { useAppDispatch } from '../../../../../store/store';
import { useState } from 'react';
type Props = {
	isSaving: boolean;
	isUpToDate: boolean;
};
export const CloseNoteButton = ({ isSaving, isUpToDate }: Props) => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// --- Close Note ---
	const onClosingNote = () => {
		dispatch(journalActions.closeNote());
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
							// sx={{ p: 2 }}
						>
							<WarningAmber fontSize="medium" />
							<Typography sx={{ pl: 1 }}>You have unsaved changes.</Typography>
						</Grid>
						<Divider sx={{ width: '100%', mb: 2 }} />
						<Grid container direction="row" justifyContent="space-around">
							<Button>Save</Button>
							<Button onClick={() => onClosingNote()}>Discard</Button>
							<Button onClick={() => setAnchorEl(null)}>Cancel</Button>
						</Grid>
					</Popover>
				</>
			)}
		</>
	);
};
