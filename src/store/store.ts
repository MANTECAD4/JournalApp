import {
	configureStore,
	type ThunkAction,
	type UnknownAction,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './auth/authSlice';
import { journalSlice } from './journal/journalSlice';
export const journalStore = configureStore({
	reducer: {
		auth: authSlice.reducer,
		journal: journalSlice.reducer,
	},
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof journalStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof journalStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	UnknownAction
>;
