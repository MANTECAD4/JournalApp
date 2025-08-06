import { loadNotes } from '../../../../src/helpers/journal/loadNotes';
import { journalActions } from '../../../../src/store/journal/journalSlice';
import { startLoadingNotes } from '../../../../src/store/journal/thunks/startLoadingNotes';
import { testNotesList } from '../../../fixtures/journalSliceFixtures';

// Mock de funcion externa (tipo un helper)
jest.mock('../../../../src/helpers/journal/loadNotes');

describe('startoadingNotes journal thunk', () => {
	const dispatch = jest.fn();
	const getState = jest.fn();
	const mockLoadNotes = loadNotes as jest.MockedFunction<typeof loadNotes>;
	mockLoadNotes.mockResolvedValue(testNotesList);

	const testUid = 'test-uid';
	getState.mockReturnValue({
		auth: {
			uid: testUid,
		},
	});

	beforeEach(() => jest.clearAllMocks());

	it('should load the retrieved notes from DB into app state', async () => {
		const thunk = startLoadingNotes();
		await thunk(dispatch, getState);
		expect(dispatch).toHaveBeenNthCalledWith(1, journalActions.setIsLoading());
		expect(mockLoadNotes).toHaveBeenCalledWith(testUid);
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			journalActions.setNotes(testNotesList)
		);
	});
});
