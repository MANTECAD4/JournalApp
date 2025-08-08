import { renderHook } from '@testing-library/react';
import { useNoteForm } from '../../../src/hooks/NoteView/useNoteForm';
import { activeNoteWrapper, journalTestStore } from '../../fixtures/wrappers';
import { startUpdatingNote } from '../../../src/store/journal/thunks/startUpdatingNote';
import { testNote1, testNote2 } from '../../fixtures/journalSliceFixtures';
import { journalActions } from '../../../src/store/journal/journalSlice';
import { act } from 'react';

jest.mock('../../../src/store/journal/thunks/startUpdatingNote', () => ({
	startUpdatingNote: jest.fn(),
}));

const mockedDispatch = jest.fn();
jest.mock('../../../src/store/store', () => ({
	useAppDispatch: () => mockedDispatch,
}));

describe('useNoteForm custom hook', () => {
	it('should set form initial values', () => {
		jest.useFakeTimers();

		const { rerender } = renderHook(() => useNoteForm(), {
			wrapper: activeNoteWrapper,
		});

		act(() => {
			jest.advanceTimersByTime(1500);
		});

		act(() => {
			journalTestStore.dispatch(journalActions.setActiveNote(testNote2));
			rerender();
		});

		act(() => {
			jest.advanceTimersByTime(1500);
		});

		expect(mockedDispatch).toHaveBeenCalled();
		expect(startUpdatingNote).toHaveBeenNthCalledWith(1, {
			title: testNote1.title,
			body: testNote1.body,
		});
		expect(startUpdatingNote).toHaveBeenNthCalledWith(2, {
			title: testNote2.title,
			body: testNote2.body,
		});
		jest.useRealTimers();
	});
});
