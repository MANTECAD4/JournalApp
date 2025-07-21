import { useSelector } from 'react-redux';
import {
	Avatar,
	Box,
	Divider,
	Drawer,
	List,
	Toolbar,
	Typography,
} from '@mui/material';
import { useAppDispatch, type RootState } from '../../store/store';
import { NoteItem } from './NoteItem';
import type { Note } from '../../store/journal/journalSlice.types';
import { journalActions } from '../../store/journal/journalSlice';
import { useCallback } from 'react';

type Props = {
	drawerWidth?: number;
};
export const Sidebar = ({ drawerWidth = 240 }: Props) => {
	const dispatch = useAppDispatch();
	const { notes } = useSelector((state: RootState) => state.journal);
	const { displayName, photoURL } = useSelector(
		(state: RootState) => state.auth
	);

	const onActivateNote = useCallback((note: Note) => {
		dispatch(journalActions.setActiveNote(note));
	}, []);

	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth, flexShrink: { sm: 0 } } }}
		>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Toolbar
					sx={{
						position: 'sticky',
						zIndex: 10,
						top: 0,
						backgroundColor: 'white',
					}}
				>
					<Avatar
						variant="circular"
						sx={{ bgcolor: '', mr: 1 }}
						alt={displayName}
						src={photoURL}
					/>

					<Typography variant="h6" noWrap component="div">
						My Notes
					</Typography>
				</Toolbar>
				<Divider />
				<List>
					{notes.map((note) => (
						<NoteItem key={note.id} note={note} activateNote={onActivateNote} />
					))}
				</List>
			</Drawer>
		</Box>
	);
};
