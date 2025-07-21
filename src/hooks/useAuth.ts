import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase';
import { useAppDispatch, type RootState } from '../store/store';
import { authActions } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks/startLoadingNotes';

/**
 * Custom hook for App router logic
 * @returns
 */
export const useAuth = () => {
	const { status } = useSelector((state: RootState) => state.auth);
	const dispatch = useAppDispatch();
	const isAuth = useMemo(() => status === 'authenticated', [status]);
	const isChecking = useMemo(() => status === 'checking', [status]);

	useEffect(() => {
		const unsuscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(authActions.logout(''));
			dispatch(
				authActions.login({
					displayName: user.displayName ?? 'No display name',
					photoURL: user.photoURL ?? 'No URL',
					uid: user.uid ?? 'No URL',
					email: user.email ?? 'No URL',
				})
			);
			dispatch(startLoadingNotes());
		});

		return () => unsuscribe();
	}, []);
	return { isAuth, isChecking, status };
};
