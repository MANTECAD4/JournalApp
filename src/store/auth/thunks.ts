import {
	signInWithGoogle,
	signInWithEmailPassword,
	createUserEmailPassword,
} from '../../firebase';
import { authActions } from './authSlice';
import { logoutFirebaseUser } from '../../firebase/providers/logoutUser';
import type { AppDispatch } from '../store';
import type { RegisterUser, SignInUser } from './auth.types';

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
		const result = await createUserEmailPassword({
			email,
			displayName,
			password,
		});
		//B Implemntar get error
		if (!result.ok) return dispatch(authActions.logout(result.errorMessage));
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

/**
 * Sign in process -> check credentials -> signInUser(Firebase) -> login | logout(error)
 * @param {SignInUser}props
 * @returns
 */
export const startEmailAndPasswordSignIn = (props: SignInUser) => {
	const { email, password } = props;
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		const result = await signInWithEmailPassword({ email, password });
		if (!result.ok) return dispatch(authActions.logout(result.errorMessage));
		if (!result.displayName || !result.email || !result.uid)
			throw new Error('Missin one required field');
		dispatch(
			authActions.login({
				displayName: result.displayName ?? 'No displayName',
				photoURL: result.photoURL ?? 'No URL',
				uid: result.uid ?? 'No uid',
				email: result.email ?? 'No email',
			})
		);
	};
};

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		await logoutFirebaseUser();
		dispatch(authActions.logout(''));
	};
};
