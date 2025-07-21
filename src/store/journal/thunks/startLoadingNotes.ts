import { loadNotes } from '../../../helpers';
import type { AppThunk } from '../../store';
import { journalActions } from '../journalSlice';

export const startLoadingNotes = (): AppThunk => {
	return async (dispatch, getState) => {
		dispatch(journalActions.setIsLoading());
		const { uid } = getState().auth;
		if (!uid) throw new Error('Session required.');
		const notes = await loadNotes(uid);
		dispatch(journalActions.setNotes(notes));
	};
};
