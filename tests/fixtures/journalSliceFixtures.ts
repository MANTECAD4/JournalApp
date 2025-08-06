import type { journalState } from '../../src/store/journal/journalSlice.types';

export const testJournalInitialState: journalState = {
	activeNote: null,
	isLoading: false,
	isSaving: false,
	notes: [],
};
export const testJrnlInitialStateIsSaving: journalState = {
	activeNote: null,
	isLoading: false,
	isSaving: true,
	notes: [],
};

export const testNote = {
	id: 'Note123',
	body: '',
	date: 12345678,
	imageUrls: [],
	title: '',
};

export const testNotesList = [
	{
		id: 'Note1',
		body: '',
		date: 12345678,
		imageUrls: [],
		title: 'Party at the beach',
	},
	{
		id: 'Note2',
		body: '',
		date: 12345678,
		imageUrls: [],
		title: 'My first kiss',
	},
	{
		id: 'Note3',
		body: '',
		date: 12345678,
		imageUrls: [],
		title: 'I step my foot on shit',
	},
];

export const testActiveNoteState = {
	activeNote: testNote,
	isLoading: false,
	isSaving: true,
	notes: [...testNotesList, testNote],
};
