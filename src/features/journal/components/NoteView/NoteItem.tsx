import React from 'react';
import { TurnedInNot } from '@mui/icons-material';
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import type { Note } from '../../../../store/journal/journalSlice.types';
import { getNotePreview } from '../../../../helpers/journal/getNotePreview';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

type Props = {
	note: Note;
	activateNote: Function;
};

export const NoteItem = React.memo(({ note, activateNote }: Props) => {
	const { isSaving } = useSelector((state: RootState) => state.journal);
	return (
		<ListItem disablePadding>
			<ListItemButton disabled={isSaving} onClick={() => activateNote(note)}>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container direction={'column'}>
					<ListItemText
						primary={new Date(note.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					/>
					<ListItemText secondary={getNotePreview(note)} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
});
