import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { journalState, Note } from './journalSlice.types';

const initialState: journalState = {
	activeNote: null,
	isLoading: false,
	isSaving: false,
	messageSaved: '',
	notes: [],
};
export const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		setIsSaving: (state) => {
			state.isSaving = true;
		},
		setIsLoading: (state) => {
			state.isLoading = true;
		},
		addNewEmptyNote: (state, action: PayloadAction<Note>) => {
			state.notes.unshift(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action: PayloadAction<Note>) => {
			state.activeNote = action.payload;
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		updateNote: (state, action: PayloadAction<Note>) => {
			state.activeNote = action.payload;
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id) {
					return action.payload;
				} else {
					return note;
				}
			});
			state.isSaving = false;
		},
		deleteNote: (state, action) => {},
	},
});
export const journalActions = journalSlice.actions;
