import { FirebaseError } from 'firebase/app';
import { getError } from './getError';

export const catchError = (error: any) => {
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
};
