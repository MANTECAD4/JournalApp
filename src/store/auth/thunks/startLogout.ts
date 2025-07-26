import { authActions } from '../authSlice';
import { logoutFirebaseUser } from '../../../firebase/providers/logoutUser';
import type { AppDispatch } from '../../store';
import { journalActions } from '../../journal/journalSlice';

export const startLogout = () => {
	return (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
		setTimeout(async () => {
			await logoutFirebaseUser();
			dispatch(journalActions.cleanJournal());

			dispatch(authActions.logout(''));
		}, 500);
	};
};
