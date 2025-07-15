import { authActions } from '../authSlice';
import type { AppDispatch } from '../../store';

export const checkingAuthentication = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(authActions.checkingCredentials());
	};
};
