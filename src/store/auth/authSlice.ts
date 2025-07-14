import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, User } from './auth.types';

const initialState: AuthState = {
	status: 'checking', //
	uid: '',
	email: '',
	displayName: '',
	photoURL: '',
	errorMessage: '',
};
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		checkingCredentials: (state) => {
			state.status = 'checking';
			state.uid = '';
			state.email = '';
			state.displayName = '';
			state.photoURL = '';
			state.errorMessage = '';
		},
		login: (state, { payload }: { type: string; payload: User }) => {
			state.status = 'authenticated'; //
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = '';
		},
		logout: (state, action: { type: string; payload: string }) => {
			state.status = 'not-authenticated';
			state.uid = '';
			state.email = '';
			state.displayName = '';
			state.photoURL = '';
			state.errorMessage = action.payload;
		},
	},
});
export const authActions = authSlice.actions;
