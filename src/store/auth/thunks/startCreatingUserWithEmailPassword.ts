import { createUserEmailPassword } from '../../../firebase';
import { authActions } from '../authSlice';
import type { AppDispatch } from '../../store';
import type { RegisterUser } from '../auth.types';

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
		if (!result.ok) return dispatch(authActions.logout(result.errorMessage));
		dispatch(
			authActions.login({
				displayName: result.displayName ?? 'No display name',
				photoURL: result.photoURL ?? 'No URL',
				uid: result.uid,
				email: result.email ?? 'No email',
			})
		);
	};
};
