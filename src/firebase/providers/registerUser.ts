import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from '../config';
import { getError } from '../../helpers';
import { catchError } from '../../helpers/firebase/catchError';

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
			errorMessage: '',
		};
	} catch (error) {
		return catchError(error);
	}
};
