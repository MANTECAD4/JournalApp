import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase';
import { useAppDispatch, type RootState } from '../store/store';
import { authActions } from '../store/auth/authSlice';

/**
 * Custom hook for App router logic
 * @returns
 */
export const useAuth = () => {
	const { status } = useSelector((state: RootState) => state.auth);
	const isAuth = useMemo(() => status === 'authenticated', [status]);
	const isChecking = useMemo(() => status === 'checking', [status]);
	const dispatch = useAppDispatch();
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
		});

		return () => unsuscribe();
	}, []);
	return { isAuth, isChecking, status };
};
