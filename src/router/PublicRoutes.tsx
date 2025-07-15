import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type Props = {
	children: ReactNode;
	isAuth: boolean;
};

export const PublicRoutes = ({ children, isAuth }: Props) => {
	return !isAuth ? children : <Navigate to={'/'} replace />;
};
