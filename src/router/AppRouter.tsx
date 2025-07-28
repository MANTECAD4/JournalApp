import { Route, Routes } from 'react-router';
import { AuthRoutes } from '../features/auth/routes/AuthRoutes';
import { JournalRoutes } from '../features/journal/routes/JournalRoutes';
import { CheckingAuthLoader } from '../features/auth/pages/CheckingAuthLoader';
import { useAuth } from '../hooks/useAuth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {
	const { isChecking, isAuth } = useAuth();

	if (isChecking === true) {
		return <CheckingAuthLoader />;
	}

	return (
		<Routes>
			<Route
				path="/auth/*"
				element={
					<PublicRoutes isAuth={isAuth}>
						<AuthRoutes />
					</PublicRoutes>
				}
			/>
			<Route
				path="/*"
				element={
					<PrivateRoutes isAuth={isAuth}>
						<JournalRoutes />
					</PrivateRoutes>
				}
			/>
		</Routes>
	);
};
