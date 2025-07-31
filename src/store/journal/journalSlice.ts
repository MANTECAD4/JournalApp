import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { journalState, Note } from './journalSlice.types';

const initialState: journalState = {
	activeNote: null,
	isLoading: false,
	isSaving: false,
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
		setActiveNote: (state, { payload }: PayloadAction<Note>) => {
			state.activeNote = payload;
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
			state.isLoading = false;
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
		deleteNote: (state, action: PayloadAction<Note>) => {
			state.notes = state.notes.filter((note) => note.id !== action.payload.id);
			state.activeNote = null;
			state.isSaving = false;
		},
		closeNote: (state) => {
			state.activeNote = null;
		},
		cleanJournal: (state) => {
			state.activeNote = null;
			state.isLoading = false;
			state.isSaving = false;
			state.notes = [];
		},
	},
});
export const journalActions = journalSlice.actions;
