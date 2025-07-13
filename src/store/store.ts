import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './auth/authSlice';
export const journalStore = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof journalStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof journalStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
