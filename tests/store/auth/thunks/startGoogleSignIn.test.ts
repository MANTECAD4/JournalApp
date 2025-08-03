import { signInWithGoogle } from '../../../../src/firebase/providers/signInWithGoogle';
import { authActions } from '../../../../src/store/auth/authSlice';
import { startGoogleSignIn } from '../../../../src/store/auth/thunks/startGoogleSignIn';
import { demoUser } from '../../../fixtures/authFixtures';
jest.mock('../../../../src/firebase/providers/signInWithGoogle');

describe('startGoogleSignIn thunk', () => {
	it('dispatches checking credentials, gets an user instance and logs it in', async () => {
		const positiveResp = { ok: true, ...demoUser, errorMessage: '' };
		const mockedSignInWithGoogle = signInWithGoogle as jest.MockedFunction<
			typeof signInWithGoogle
		>;

		mockedSignInWithGoogle.mockResolvedValue(positiveResp);

		const dispatch = jest.fn();
		const callback = startGoogleSignIn();
		await callback(dispatch);
		expect(dispatch).toHaveBeenNthCalledWith(
			1,
			authActions.checkingCredentials()
		);
		expect(dispatch).toHaveBeenNthCalledWith(2, authActions.login(demoUser));
	});

	it('dispatches logout with an error', async () => {
		const testErrorMsg = 'Error with popup';
		const negativeResp = {
			ok: false,
			uid: '',
			displayName: '',
			photoURL: '',
			email: '',
			errorMessage: testErrorMsg,
		};
		const mockedSignInWithGoogle = signInWithGoogle as jest.MockedFunction<
			typeof signInWithGoogle
		>;

		mockedSignInWithGoogle.mockResolvedValue(negativeResp);
		const dispatch = jest.fn();

		const callback = startGoogleSignIn();
		await callback(dispatch);
		expect(dispatch).toHaveBeenNthCalledWith(
			1,
			authActions.checkingCredentials()
		);
		expect(dispatch).toHaveBeenNthCalledWith(
			2,
			authActions.logout(testErrorMsg)
		);
	});
});
