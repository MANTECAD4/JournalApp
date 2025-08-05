import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store/auth/authSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
});

export const useLoginWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => <Provider store={store}>{children}</Provider>;
