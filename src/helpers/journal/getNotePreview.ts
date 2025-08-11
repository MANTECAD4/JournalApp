import type { Note } from '@/store/journal/journalSlice.types';

export const getNotePreview = (note: Note) => {
	if (note.title)
		return note.title.length > 34
			? note.title.slice(0, 34) + '...'
			: note.title;
	if (note.body)
		return note.body.length > 34 ? note.body.slice(0, 34) + '...' : note.body;

	return 'Untitled note';
};
