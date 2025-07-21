import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';

export const loadNotes = async (uid: string) => {
	const collecyionRef = collection(FirebaseDB, `users/${uid}/notes`);
	const querySnapshot = await getDocs(collecyionRef);
	const notes = querySnapshot.docs.map((doc) => doc.data());
	return notes;
};
