import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase';
import { journalActions } from '../journalSlice';
import type { AppThunk } from '../../store';
import type { Note } from '../journalSlice.types';

export const startCreatingEmptyNote = (): AppThunk => {
	return async (dispatch, getState) => {
		dispatch(journalActions.setIsSaving());
		// 1. Extrae el UID del usuario autenticado desde el estado de Redux
		const { uid } = getState().auth;

		// 2. Verifica que haya un UID válido (usuario autenticado)
		if (!uid) throw new Error('Session required.');

		// 3. Obtiene una referencia a la subcolección 'notes' dentro del documento del usuario
		// Ruta: users/{uid}/notes
		const notesCollection = collection(FirebaseDB, 'users', uid, 'notes');

		// 4. Crea una nueva referencia a un documento en esa subcolección, con un ID aleatorio
		const newDocReference = doc(notesCollection);

		// 5. Define el contenido del nuevo documento (una nota vacía con fecha actual)
		const newNote: Note = {
			id: newDocReference.id, // Identificador del documento
			title: '', // Título vacío por defecto
			body: '', // Cuerpo vacío por defecto
			date: new Date().getTime(), // Timestamp actual (en milisegundos)
			imageUrls: [],
		};

		// 6. Guarda el documento en Firestore en la ruta generada (con el contenido definido)
		await setDoc(newDocReference, newNote);
		dispatch(journalActions.addNewEmptyNote(newNote));
		dispatch(journalActions.setActiveNote(newNote));
	};
};
