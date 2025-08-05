import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store/auth/authSlice';
import { notAuthenticatedState } from './authFixtures';

export const notAuthenticatedStore = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

export const notAuthWrapper = ({ children }: { children: React.ReactNode }) => (
	<Provider store={notAuthenticatedStore}>{children}</Provider>
);
