import { authActions, authSlice } from '../../../src/store/auth/authSlice';
import {
	authenticatedState,
	demoUser,
	initialState,
	notAuthenticatedState,
} from '../../fixtures/authFixtures';
describe('Auth Slice', () => {
	it('returns the right initial state and slice name', () => {
		expect(authSlice.name).toBe('auth');
		const state = authSlice.reducer(initialState, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('sets user via login', () => {
		const state = authSlice.reducer(initialState, authActions.login(demoUser));
		expect(state).toEqual({
			status: 'authenticated', //
			uid: demoUser.uid,
			email: demoUser.email,
			displayName: demoUser.displayName,
			photoURL: demoUser.photoURL,
			errorMessage: '',
		});
	});

	it('clears journal slice state via logout', () => {
		const state = authSlice.reducer(authenticatedState, authActions.logout(''));
		expect(state).toEqual({
			status: 'not-authenticated', //
			uid: '',
			email: '',
			displayName: '',
			photoURL: '',
			errorMessage: '',
		});
	});

	it('sets the error message produced by login', () => {
		const errorMessage = 'Opps! Something went wrong.';
		const state = authSlice.reducer(
			authenticatedState,
			authActions.logout(errorMessage)
		);
		expect(state).toEqual({
			status: 'not-authenticated', //
			uid: '',
			email: '',
			displayName: '',
			photoURL: '',
			errorMessage,
		});
	});

	it(`sets 'checking' status via chicking credentials action`, () => {
		const state = authSlice.reducer(
			notAuthenticatedState,
			authActions.checkingCredentials()
		);
		expect(state.status).toBe('checking');
	});
});
