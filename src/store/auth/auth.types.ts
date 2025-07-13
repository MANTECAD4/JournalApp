export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
}
export interface AuthState extends User {
	status: 'checking' | 'not-authenticated' | 'authenticated';
	errorMessage: string | null;
}

export type RegisterUser = {
	email: string;
	password: string;
	displayName: string;
};

export type SignInUser = {
	email: string;
	password: string;
};
