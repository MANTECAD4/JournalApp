import { doc, setDoc } from 'firebase/firestore/lite';
import type { AppThunk } from '../../store';
import { journalActions } from '../journalSlice';
import { FirebaseDB } from '../../../firebase';
import type { NoteImage } from '../journalSlice.types';

type NotePayload = {
	title: string;
	body: string;
	imageUrls?: NoteImage[];
};

export const startUpdatingNote = ({
	title,
	body,
	imageUrls,
}: NotePayload): AppThunk => {
	return async (dispatch, getState) => {
		const auth = getState().auth;
		const { uid } = auth;
		const activeNote = getState().journal.activeNote;

		if (!uid || !activeNote) return;

		dispatch(journalActions.setIsSaving());

		const { id, date } = activeNote;

		const docReference = doc(FirebaseDB, `users/${uid}/notes/${id}`);
		if (imageUrls) {
			await setDoc(docReference, { title, body, imageUrls }, { merge: true });
			dispatch(journalActions.updateNote({ id, date, title, body, imageUrls }));
		} else {
			const { imageUrls } = activeNote;
			await setDoc(docReference, { title, body, imageUrls }, { merge: true });
			dispatch(journalActions.updateNote({ id, date, title, body, imageUrls }));
		}
	};
};
