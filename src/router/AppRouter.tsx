import { Navigate, Route, Routes } from 'react-router';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

import { CheckingAuthLoader } from '../auth/pages/CheckingAuthLoader';
import { useAuth } from '../hooks/useAuth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { useMemo } from 'react';

export const AppRouter = () => {
	const { status, isAuth } = useAuth();

	if (status === 'checking') {
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

// <Routes>
// 	{status === 'authenticated' ? (
// 		<Route path="*" element={<JournalRoutes />} />
// 	) : (
// 		<Route path="*" element={<AuthRoutes />} />
// 	)}

// 	{/* Catch-all route for unknown paths */}
// 	<Route
// 		path="*"
// 		element={
// 			<Navigate to={status === 'authenticated' ? '/' : '/auth/login'} />
// 		}
// 	/>
// </Routes>
