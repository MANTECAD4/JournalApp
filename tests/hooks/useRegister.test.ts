import { renderHook } from '@testing-library/react';
import { useRegister } from '../../src/hooks/useRegister';
import { notAuthWrapper } from '../fixtures/wrappers';
import { act } from 'react';
import { startCreatingUserWithEmailPassword } from '../../src/store/auth/thunks/startCreatingUserWithEmailPassword';

const mockedUseAppDispatch = jest.fn();
jest.mock('../../src/store/store', () => ({
	...jest.requireActual('../../src/store/store'),
	useAppDispatch: () => mockedUseAppDispatch,
}));

jest.mock('../../src/store/auth/thunks/startCreatingUserWithEmailPassword');

describe('useRegister custom hook (Register page logic)', () => {
	it(`dispatches 'startCreatingUserWithEmailPassword' thunk within onSubmit method`, () => {
		const testData = {
			displayName: 'Demo user',
			email: 'demo@gmail.com',
			password: 'password123',
		};
		const { result } = renderHook(useRegister, { wrapper: notAuthWrapper });
		const { onSubmit } = result.current;

		act(() => {
			onSubmit(testData);
		});

		expect(mockedUseAppDispatch).toHaveBeenCalled();
		expect(startCreatingUserWithEmailPassword).toHaveBeenCalledWith(testData);
	});
});
