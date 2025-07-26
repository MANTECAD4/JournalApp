import { doc, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase';
import type { AppThunk } from '../../store';
import { journalActions } from '../journalSlice';

export const startDeletingNote = (): AppThunk => {
	return async (dispatch, getState) => {
		dispatch(journalActions.setIsSaving());
		const state = getState();
		const { uid } = state.auth;
		const { activeNote: note } = state.journal;
		if (!uid || !note) return;
		dispatch(journalActions.deleteNote(note));
		const docReference = doc(FirebaseDB, `users/${uid}/notes/${note.id}`);
		await deleteDoc(docReference);
	};
};
