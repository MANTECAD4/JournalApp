import { signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from '../config';
import { GoogleAuthProvider } from 'firebase/auth';
import { catchError } from '../../helpers/firebase/catchError';

const googleProvider = new GoogleAuthProvider();

/**
 * Logs in via Google Provider
 * @returns
 */
export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		const { displayName, email, photoURL, uid } = result.user;
		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
			errorMessage: '',
		};
	} catch (error) {
		return catchError(error);
	}
};
