import {
	collection,
	deleteDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore/lite';
import { journalActions } from '../../../../src/store/journal/journalSlice';
import { startCreatingEmptyNote } from '../../../../src/store/journal/thunks/startCreatingEmptyNote';
import { FirebaseDB } from '../../../../src/firebase';

jest.mock('firebase/firestore/lite', () => ({
	...jest.requireActual('firebase/firestore/lite'),
	setDoc: jest.fn(),
}));

describe('startCreatingEmptyNote journal thunk', () => {
	// Mocks
	const dispatch = jest.fn();
	const getState = jest.fn();
	const uid = 'test-uid123';
	getState.mockReturnValue({
		auth: {
			uid,
		},
	});

	beforeEach(() => jest.clearAllMocks());

	it('Creates a new empty note', async () => {
		const callback = startCreatingEmptyNote();
		await callback(dispatch, getState);
		expect(dispatch).toHaveBeenNthCalledWith(1, journalActions.setIsSaving());
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			journalActions.addNewEmptyNote({
				title: '',
				body: '',
				imageUrls: [],
				date: expect.any(Number),
				id: expect.any(String),
			})
		);
		expect(dispatch).toHaveBeenNthCalledWith(
			3,
			journalActions.setActiveNote({
				title: '',
				body: '',
				imageUrls: [],
				date: expect.any(Number),
				id: expect.any(String),
			})
		);
		expect(setDoc).toHaveBeenCalled();

		// Deleting register
		const notesCollection = collection(FirebaseDB, 'users', uid, 'notes');
		const docs = await getDocs(notesCollection);
		const deletePrommises: Promise<void>[] = [];
		docs.forEach((doc) => deletePrommises.push(deleteDoc(doc.ref)));
		await Promise.all(deletePrommises);
	});
});
