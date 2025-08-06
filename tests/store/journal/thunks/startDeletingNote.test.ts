import { testNote } from '../../../fixtures/journalSliceFixtures';
import { startDeletingNote } from '../../../../src/store/journal/thunks/startDeletingNote';
import { journalActions } from '../../../../src/store/journal/journalSlice';
import { deleteDoc, doc } from 'firebase/firestore/lite';

jest.mock('firebase/firestore/lite', () => ({
	...jest.requireActual('firebase/firestore/lite'),
	deleteDoc: jest.fn(),
	doc: jest.fn(),
}));

describe('startDeletingNote journal thunk', () => {
	const uid = 'user-test-id';
	const dispatch = jest.fn();
	const getState = jest.fn();
	getState.mockReturnValue({
		auth: {
			uid,
		},
		journal: {
			activeNote: testNote,
		},
	});

	it('should delete active note, in both app state and firebase db', async () => {
		const thunk = startDeletingNote();
		await thunk(dispatch, getState);
		expect(dispatch).toHaveBeenNthCalledWith(1, journalActions.setIsSaving());
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			journalActions.deleteNote(testNote)
		);
		expect(doc).toHaveBeenCalled();
		expect(deleteDoc).toHaveBeenCalled();
	});
});
