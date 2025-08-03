import { logoutFirebaseUser } from '../../../../src/firebase/providers/logoutUser';
import { authActions } from '../../../../src/store/auth/authSlice';
import { startLogout } from '../../../../src/store/auth/thunks/startLogout';
import { journalActions } from '../../../../src/store/journal/journalSlice';
jest.mock('../../../../src/firebase/providers/logoutUser');
describe('startLogout auth thunk', () => {
	const mockedLogoutFirebaseUser = logoutFirebaseUser as jest.MockedFunction<
		typeof logoutFirebaseUser
	>;
	const dispatch = jest.fn();
	beforeAll(() => jest.clearAllMocks());

	it('logs out user from both app state and firebase', async () => {
		const callback = startLogout();
		await callback(dispatch);
		expect(dispatch).toHaveBeenNthCalledWith(
			1,
			authActions.checkingCredentials()
		);
		expect(mockedLogoutFirebaseUser).toHaveBeenCalled();
		expect(dispatch).toHaveBeenNthCalledWith(2, journalActions.cleanJournal());
		expect(dispatch).toHaveBeenNthCalledWith(3, authActions.logout(''));
	});
});
