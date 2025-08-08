import React, { useMemo } from 'react';
import TurnedInNot from '@mui/icons-material/TurnedInNot';
import TurnedIn from '@mui/icons-material/TurnedIn';
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
import { grey } from '@mui/material/colors';

type Props = {
	note: Note;
	activateNote: Function;
};

export const NoteItem = React.memo(({ note, activateNote }: Props) => {
	const { activeNote } = useSelector((state: RootState) => state.journal);

	const isActive = useMemo(
		() => activeNote !== null && activeNote.id === note.id,
		[note, activeNote]
	);
	return (
		<ListItem
			disablePadding
			sx={
				isActive
					? {
							backgroundColor: grey[100],
					  }
					: {}
			}
		>
			<ListItemButton onClick={() => activateNote(note)}>
				<ListItemIcon>{isActive ? <TurnedIn /> : <TurnedInNot />}</ListItemIcon>
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
