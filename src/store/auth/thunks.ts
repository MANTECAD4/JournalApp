import { signInWithGoogle, registerUser } from '../../firebase/providers';
import { authActions } from './authSlice';
import type { AppDispatch, RootState } from '../store';
import type { RegisterUser } from './auth.types';

export const checkingAuthentication = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		const result = await signInWithGoogle();
		if (!result.ok) return dispatch(authActions.logout(result.errorMessage!));
		if (!result.displayName || !result.email || !result.uid)
			throw new Error('Missing one required field');

		dispatch(
			authActions.login({
				displayName: result.displayName,
				photoURL: result.photoURL ? result.photoURL : 'No URL',
				uid: result.uid,
				email: result.email,
			})
		);
	};
};

/**
 * Register user process - check credentials -> registerUser -> login
 * @param {RegisterUser}props
 * @returns
 */
export const startCreatingUserWithEmailPassword = (props: RegisterUser) => {
	const { displayName, email, password } = props;
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		const result = await registerUser({ email, displayName, password });
		//B Implemntar get error
		if (!result.ok) return dispatch(authActions.logout(result.errorMessage!));
		if (!result.displayName || !result.email || !result.uid)
			throw new Error('Missin one required field');
		dispatch(
			authActions.login({
				displayName: result.displayName,
				photoURL: result.photoURL ? result.photoURL : 'No URL',
				uid: result.uid,
				email: result.email,
			})
		);
	};
};
