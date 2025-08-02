import { AuthState } from '../../src/store/auth/auth.types';

export const initialState: AuthState = {
	status: 'checking', //
	uid: '',
	email: '',
	displayName: '',
	photoURL: '',
	errorMessage: '',
};

export const authenticatedState: AuthState = {
	status: 'authenticated', //
	uid: '123ABC',
	email: 'demo@gmail.com',
	displayName: 'Demo user',
	photoURL: 'https://demo.com',
	errorMessage: '',
};

export const notAuthenticatedState: AuthState = {
	status: 'not-authenticated', //
	uid: '',
	email: '',
	displayName: '',
	photoURL: '',
	errorMessage: '',
};

export const demoUser = {
	uid: '123ABC',
	email: 'demo@gmail.com',
	displayName: 'Demo user',
	photoURL: 'https://demo.com',
};
