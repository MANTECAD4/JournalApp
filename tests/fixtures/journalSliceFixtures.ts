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

export const testNote1 = {
	id: 'Note1',
	body: '',
	date: 12345678,
	imageUrls: [],
	title: 'Note number one',
};
export const testNote2 = {
	id: 'Note2',
	body: '',
	date: 12345678,
	imageUrls: [],
	title: 'note numbeer two',
};

export const testNotesList = [
	testNote1,
	testNote2,
	{
		id: 'Note3',
		body: '',
		date: 12345678,
		imageUrls: [],
		title: 'I step my foot on shit',
	},
];

export const testActiveNoteState = {
	activeNote: testNote1,
	isLoading: false,
	isSaving: true,
	notes: [...testNotesList],
};
