import { checkingAuthentication } from '../../../../src/store/auth/thunks/checkingAuthentication';
import { authActions } from '../../../../src/store/auth/authSlice';

describe('checkingAuthentication thunk', () => {
	it('dispatches checkingCredentials action', async () => {
		const dispatch = jest.fn();
		const callback = checkingAuthentication();
		await callback(dispatch);
		const action = authActions.checkingCredentials();
		expect(dispatch).toHaveBeenNthCalledWith(1, action);
	});
});
