import { signInWithEmailPassword } from '../../../../src/firebase/providers/signInUser';
import { demoUser } from '../../../fixtures/authFixtures';
import { startEmailAndPasswordSignIn } from '../../../../src/store/auth/thunks/startEmailAndPasswordSignIn';
import { authActions } from '../../../../src/store/auth/authSlice';

jest.mock('../../../../src/firebase/providers/signInUser');

describe('startEmailAndPasswordSignIn auth thunk', () => {
	// Mocks
	const mockedSignInWithEmailPassword =
		signInWithEmailPassword as jest.MockedFunction<
			typeof signInWithEmailPassword
		>;
	const dispatch = jest.fn();
	beforeEach(() => jest.clearAllMocks());

	// Testing success behavior
	it('logs in user in both state and firebase', async () => {
		const credentials = { email: 'demo@gmail.com', password: '12345' };
		mockedSignInWithEmailPassword.mockResolvedValue({
			ok: true,
			errorMessage: '',
			...demoUser,
		});

		const callback = startEmailAndPasswordSignIn(credentials);
		await callback(dispatch);
		expect(dispatch).toHaveBeenNthCalledWith(
			1,
			authActions.checkingCredentials()
		);
		expect(dispatch).toHaveBeenNthCalledWith(2, authActions.login(demoUser));
	});

	// Testing failure behavior
	it('logs out with an error', async () => {
		const credentials = { email: 'demo@gmail.com', password: 'wrong_password' };
		const testErrorMessage = 'Error while signin in with email and password';
		mockedSignInWithEmailPassword.mockResolvedValue({
			ok: false,
			errorMessage: testErrorMessage,
			uid: '',
			email: '',
			displayName: '',
			photoURL: '',
		});

		const callback = startEmailAndPasswordSignIn(credentials);
		await callback(dispatch);
		expect(dispatch).toHaveBeenNthCalledWith(
			1,
			authActions.checkingCredentials()
		);
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			authActions.logout(testErrorMessage)
		);
	});
});
