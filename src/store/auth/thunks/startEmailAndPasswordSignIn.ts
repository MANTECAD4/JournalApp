import { signInWithEmailPassword } from '../../../firebase';
import { authActions } from '../authSlice';
import type { AppDispatch } from '../../store';
import type { SignInUser } from '../auth.types';

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
