import { doc, setDoc } from 'firebase/firestore/lite';
import { testNote1 } from '../../../fixtures/journalSliceFixtures';
import { startUpdatingNote } from '../../../../src/store/journal/thunks/startUpdatingNote';
import { journalActions } from '../../../../src/store/journal/journalSlice';

jest.mock('firebase/firestore/lite', () => ({
	...jest.requireActual('firebase/firestore/lite'),
	doc: jest.fn(),
	setDoc: jest.fn(),
}));

describe('startUpdatingNote journal thunk', () => {
	const dispatch = jest.fn();
	const getState = jest.fn();
	getState.mockReturnValue({
		auth: {
			uid: 'test-uid',
		},
		journal: {
			activeNote: testNote1,
		},
	});

	beforeEach(() => jest.clearAllMocks());

	it('should update active note current payload', async () => {
		const newData = {
			title: 'New title uwu',
			body: 'New body uwu',
		};

		const thunk = startUpdatingNote(newData);
		await thunk(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, journalActions.setIsSaving());
		expect(doc).toHaveBeenCalled();
		expect(setDoc).toHaveBeenCalled();
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			journalActions.updateNote({
				...testNote1,
				title: newData.title,
				body: newData.body,
			})
		);
	});

	it('should update active note current payload (imgs included)', async () => {
		const newData = {
			title: 'New title uwu',
			body: 'New body uwu',
			imageUrls: [
				{
					secure_url: 'https://demo2.jpg',
					name: 'MyPhotoUwu',
					id: 'Photo1234',
				},
			],
		};

		const thunk = startUpdatingNote(newData);
		await thunk(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, journalActions.setIsSaving());
		expect(doc).toHaveBeenCalled();
		expect(setDoc).toHaveBeenCalled();
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			journalActions.updateNote({
				...testNote1,
				title: newData.title,
				body: newData.body,
				imageUrls: newData.imageUrls,
			})
		);
	});
});
