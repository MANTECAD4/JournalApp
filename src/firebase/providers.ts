import { FirebaseError } from 'firebase/app';
import { FirebaseAuth } from './config';
import {
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { getError } from '../helpers/auth';

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
		};
	} catch (error) {
		let errorMessage = 'Oops! Something went wrong. Try again.';

		if (error instanceof FirebaseError) {
			errorMessage = getError(error.code);
		} else if (error instanceof Error) {
			console.warn(error.message);
			errorMessage = error.message;
		} else {
			console.warn(JSON.stringify(error));
		}

		return {
			ok: false,
			errorMessage,
		};
	}
};

type RegisterUser = {
	email: string;
	password: string;
	displayName: string;
};
/**
 * Creates a new user with Firebase
 * @param {RegisterUser} props
 * @returns
 */
export const registerUser = async (props: RegisterUser) => {
	const { displayName, email, password } = props;
	try {
		const resp = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid, photoURL } = resp.user;

		await updateProfile(FirebaseAuth.currentUser!, { displayName });
		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		let errorMessage = 'Oops! Something went wrong. Try again.';

		if (error instanceof FirebaseError) {
			errorMessage = getError(error.code);
		} else if (error instanceof Error) {
			console.warn(error.message);
			errorMessage = error.message;
		} else {
			console.warn(JSON.stringify(error));
		}

		return {
			ok: false,
			errorMessage,
		};
	}
};
