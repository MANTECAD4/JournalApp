import { authActions } from '../authSlice';
import { logoutFirebaseUser } from '../../../firebase/providers/logoutUser';
import type { AppDispatch } from '../../store';

export const startLogout = () => {
	return (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		setTimeout(async () => {
			await logoutFirebaseUser();
			dispatch(authActions.logout(''));
		}, 500);
	};
};
