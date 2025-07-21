import { TurnedInNot } from '@mui/icons-material';
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import type { Note } from '../../store/journal/journalSlice.types';
import { getNotePreview } from '../../helpers/journal/getNotePreview';
import React from 'react';

type Props = {
	note: Note;
	activateNote: Function;
};

export const NoteItem = React.memo(({ note, activateNote }: Props) => {
	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => activateNote(note)}>
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
