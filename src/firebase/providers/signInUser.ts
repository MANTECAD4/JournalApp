import { FirebaseAuth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { catchError } from '../../helpers/firebase/catchError';

type LoginUser = {
	email: string;
	password: string;
};

/**
 * Sign in with email and password
 * @param {LoginUser}props
 * @returns
 */
export const signInWithEmailPassword = async (props: LoginUser) => {
	const { email, password } = props;
	try {
		const resp = await signInWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { displayName, photoURL, uid } = resp.user;
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
