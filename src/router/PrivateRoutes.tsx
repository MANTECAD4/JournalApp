import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type Props = {
	children: ReactNode;
	isAuth: boolean;
};

export const PrivateRoutes = ({ children, isAuth }: Props) => {
	return isAuth ? children : <Navigate to={'/auth/login'} replace />;
};
