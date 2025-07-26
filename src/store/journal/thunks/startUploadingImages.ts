import { doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase';
import { fileUpload } from '../../../helpers/journal/fileUpload';
import type { AppThunk } from '../../store';
import { journalActions } from '../journalSlice';

export const startUploadingImages = (files: File[] = []): AppThunk => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const note = getState().journal.activeNote;
		if (!uid || !note) throw new Error('Oops! Something went wrong.');
		dispatch(journalActions.setIsSaving());
		const fileUploadPromises: Promise<string>[] = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		const { imageURLs: prevImages } = note;
		const CloudinaryImageURLs = await Promise.all(fileUploadPromises);
		const imageURLs = CloudinaryImageURLs.concat(prevImages);
		dispatch(journalActions.updateImageUrls(imageURLs));

		const docReference = doc(FirebaseDB, `users/${uid}/notes/${note.id}`);
		await setDoc(docReference, { imageURLs }, { merge: true });
	};
};
