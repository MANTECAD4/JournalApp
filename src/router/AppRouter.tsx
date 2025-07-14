import { Route, Routes } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { CheckingAuthLoader } from '../auth/pages/CheckingAuthLoader';
export const AppRouter = () => {
	const { status } = useSelector((state: RootState) => state.auth);

	if (status === 'checking') {
		return <CheckingAuthLoader />;
	}
	return (
		<Routes>
			{/* Login y registro  */}
			<Route path="/auth/*" element={<AuthRoutes />} />
			{/* JournalApp  */}
			<Route path="/*" element={<JournalRoutes />} />
		</Routes>
	);
};
