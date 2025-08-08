import { renderHook } from '@testing-library/react';
import { useNoteForm } from '../../../src/hooks/NoteView/useNoteForm';
import { activeNoteWrapper } from '../../fixtures/wrappers';
import { testNote1 } from '../../fixtures/journalSliceFixtures';

const mockedReset = jest.fn();
const mockedWatch = jest.fn();
jest.mock('react-hook-form', () => ({
	useForm: jest.fn(() => ({
		register: jest.fn(),
		watch: mockedWatch,
		reset: mockedReset,
	})),
}));
mockedWatch.mockImplementation((field) =>
	field === 'title' ? testNote1.title : testNote1.body
);

describe('useNoteForm custom hook', () => {
	it('should set form initial values', () => {
		renderHook(() => useNoteForm(), {
			wrapper: activeNoteWrapper,
		});

		expect(mockedReset).toHaveBeenCalled();
	});
});
