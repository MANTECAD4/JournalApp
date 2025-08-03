import { createUserEmailPassword } from '../../../../src/firebase/providers/registerUser';
import { demoUser } from '../../../fixtures/authFixtures';
import { startCreatingUserWithEmailPassword } from '../../../../src/store/auth/thunks/startCreatingUserWithEmailPassword';
import { authActions } from '../../../../src/store/auth/authSlice';
jest.mock('../../../../src/firebase/providers/registerUser');
describe('startCreatingUserWithEmailPassword auth thunk', () => {
	const mockedCreateUserEmailPassword =
		createUserEmailPassword as jest.MockedFunction<
			typeof createUserEmailPassword
		>;
	const dispatch = jest.fn();
	beforeEach(() => jest.clearAllMocks());

	it('creates a new user and logs it in', async () => {
		const userData = {
			displayName: demoUser.displayName,
			email: demoUser.email,
			password: '12345',
		};
		mockedCreateUserEmailPassword.mockResolvedValue({
			ok: true,
			errorMessage: '',
			...demoUser,
		});
		const callback = startCreatingUserWithEmailPassword(userData);
		await callback(dispatch);
		expect(dispatch).toHaveBeenNthCalledWith(
			1,
			authActions.checkingCredentials()
		);
		expect(dispatch).toHaveBeenNthCalledWith(2, authActions.login(demoUser));
	});

	it('dispatches an error', async () => {
		const userData = {
			displayName: demoUser.displayName,
			email: demoUser.email,
			password: '12345',
		};
		const testErrorMessage = 'Error while creating user';
		mockedCreateUserEmailPassword.mockResolvedValue({
			ok: false,
			errorMessage: testErrorMessage,
			uid: '',
			email: '',
			displayName: '',
			photoURL: '',
		});
		const callback = startCreatingUserWithEmailPassword(userData);
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
