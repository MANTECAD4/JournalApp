import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useLogin } from '../../src/hooks/useLogin';
import { useLoginWrapper } from '../fixtures/wrappers';
import { startGoogleSignIn } from '../../src/store/auth/thunks/startGoogleSignIn';
import { startEmailAndPasswordSignIn } from '../../src/store/auth/thunks/startEmailAndPasswordSignIn';

const mockedUseAppDispatch = jest.fn();
jest.mock('../../src/store/store', () => ({
	...jest.requireActual('../../src/store/store'),
	useAppDispatch: () => mockedUseAppDispatch,
}));

jest.mock('../../src/store/auth/thunks/startGoogleSignIn');
const mockedStartGoogleSignIn = startGoogleSignIn as jest.MockedFunction<
	typeof startGoogleSignIn
>;

jest.mock('../../src/store/auth/thunks/startEmailAndPasswordSignIn');
const mockedStartEmailAndPasswordSignIn =
	startEmailAndPasswordSignIn as jest.MockedFunction<
		typeof startEmailAndPasswordSignIn
	>;

describe('useLogin custom hook (login-page logic)', () => {
	beforeEach(() => jest.clearAllMocks());

	it(`dispatches startGoogleSignIn within 'onGoogleSignIn' method`, () => {
		const { result } = renderHook(() => useLogin(), {
			wrapper: useLoginWrapper,
		});
		const { onGoogleSignIn } = result.current;
		act(() => {
			onGoogleSignIn();
		});
		expect(mockedUseAppDispatch).toHaveBeenCalled();
		expect(mockedStartGoogleSignIn).toHaveBeenCalledWith();
	});

	it(`dispatches 'startEmailAndPasswordSignIn' within 'onSubmit' method`, () => {
		const testData = { password: 'password123', email: 'example@gmail.com' };
		const { result } = renderHook(() => useLogin(), {
			wrapper: useLoginWrapper,
		});
		const { onSubmit } = result.current;
		act(() => {
			onSubmit(testData);
		});
		expect(mockedUseAppDispatch).toHaveBeenCalled();
		expect(mockedStartEmailAndPasswordSignIn).toHaveBeenCalledWith(testData);
	});
});
