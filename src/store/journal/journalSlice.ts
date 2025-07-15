import { createSlice } from '@reduxjs/toolkit';
import type { journalState } from './journalSlice.types';

const initialState: journalState = {
	activeNote: null,
	imageURLs: [],
	isSaving: true,
	messageSaved: '',
	notes: [],
};
export const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		addNewEmptyNote: (state, action) => {},
		setActiveNote: (state, action) => {},
		setNotes: (state, action) => {},
		setSaving: (state, action) => {},
		updateNote: (state, action) => {},
		deleteNote: (state, action) => {},
	},
});
export const journalActions = journalSlice.actions;
