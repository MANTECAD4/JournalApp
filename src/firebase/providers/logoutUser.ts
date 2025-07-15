import { FirebaseAuth } from '../config';

export const logoutFirebaseUser = async () => {
	await FirebaseAuth.signOut();
};
