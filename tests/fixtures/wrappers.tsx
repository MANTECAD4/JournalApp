import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store/auth/authSlice';
import { notAuthenticatedState } from './authFixtures';
import { testActiveNoteState } from './journalSliceFixtures';
import { journalSlice } from '../../src/store/journal/journalSlice';

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

export const journalTestStore = configureStore({
	reducer: {
		journal: journalSlice.reducer,
	},
	preloadedState: {
		journal: testActiveNoteState,
	},
});

export const activeNoteWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => <Provider store={journalTestStore}>{children}</Provider>;
