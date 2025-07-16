import { signInWithGoogle } from '../../../firebase';
import { authActions } from '../authSlice';
import type { AppDispatch } from '../../store';

export const startGoogleSignIn = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		const result = await signInWithGoogle();
		if (!result.ok) return dispatch(authActions.logout(result.errorMessage!));
		dispatch(
			authActions.login({
				displayName: result.displayName ?? '',
				photoURL: result.photoURL ?? '',
				uid: result.uid,
				email: result.email ?? '',
			})
		);
	};
};
