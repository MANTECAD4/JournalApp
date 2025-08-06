import {
	journalActions,
	journalSlice,
} from '../../../src/store/journal/journalSlice';
import {
	testNote,
	testJournalInitialState,
	testNotesList,
	testJrnlInitialStateIsSaving,
	testActiveNoteState,
} from '../../fixtures/journalSliceFixtures';
describe('Journal Slice', () => {
	it('should return the right initial state and slice name', () => {
		expect(journalSlice.name).toBe('journal');
		const state = journalSlice.reducer(testJournalInitialState, { type: '' });
		expect(state).toEqual(testJournalInitialState);
	});

	it('should set isSaving flag value to true via the setIsSaving action', () => {
		const state = journalSlice.reducer(
			testJournalInitialState,
			journalActions.setIsSaving()
		);
		expect(state.isSaving).toBe(true);
	});

	it('should set isLoading flag value to true via the setIsLoading action', () => {
		const state = journalSlice.reducer(
			testJournalInitialState,
			journalActions.setIsLoading()
		);
		expect(state.isLoading).toBe(true);
	});

	it('should add an empty note to the list and set isSaving flag to false', () => {
		const state = journalSlice.reducer(
			testJrnlInitialStateIsSaving,
			journalActions.addNewEmptyNote(testNote)
		);
		expect(state.notes).toContain(testNote);
		expect(state.isSaving).toBe(false);
	});

	it('should set a note as active via the setActiveNote action', () => {
		const state = journalSlice.reducer(
			testJournalInitialState,
			journalActions.setActiveNote(testNote)
		);
		expect(state.activeNote).toEqual(testNote);
	});

	it('should set notes list', () => {
		const state = journalSlice.reducer(
			testJournalInitialState,
			journalActions.setNotes(testNotesList)
		);
		expect(state.notes).toEqual(testNotesList);
	});

	it(`should update active's note payload, even in notes list`, () => {
		const updatedNote = { ...testNote, title: 'New title uwu' };

		const state = journalSlice.reducer(
			testActiveNoteState,
			journalActions.updateNote(updatedNote)
		);

		expect(state.activeNote).toEqual(updatedNote);
		expect(state.notes).toContain(updatedNote);
		expect(state.isSaving).toBe(false);
	});

	it('should delete the active note', () => {
		const state = journalSlice.reducer(
			testActiveNoteState,
			journalActions.deleteNote(testNote)
		);
		expect(state.activeNote).toBe(null);
		expect(state.notes).not.toContain(testNote);
		expect(state.isSaving).toBe(false);
	});

	it('should set active note to null on closing note', () => {
		const state = journalSlice.reducer(
			testActiveNoteState,
			journalActions.closeNote()
		);
		expect(state.activeNote).toBe(null);
	});

	it('should clear the application state', () => {
		const state = journalSlice.reducer(
			testActiveNoteState,
			journalActions.cleanJournal()
		);
		expect(state.activeNote).toBe(null);
		expect(state.isLoading).toBe(false);
		expect(state.isSaving).toBe(false);
		expect(state.notes).toEqual([]);
	});
});
