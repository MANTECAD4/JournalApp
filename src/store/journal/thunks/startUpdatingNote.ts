import { doc, setDoc } from 'firebase/firestore/lite';
import type { AppThunk } from '../../store';
import { journalActions } from '../journalSlice';
import type { Note } from '../journalSlice.types';
import { FirebaseDB } from '../../../firebase';

export const startUpdatingNote = (note: Note): AppThunk => {
	return async (dispatch, getState) => {
		dispatch(journalActions.setIsSaving());
		const { uid } = getState().auth;

		// 2. Verifica que haya un UID válido (usuario autenticado)
		if (!uid) throw new Error('Session required.');

		dispatch(journalActions.updateNote(note));

		const docReference = doc(FirebaseDB, `users/${uid}/notes/${note.id}`);
		await setDoc(docReference, note, { merge: true });
	};
};
