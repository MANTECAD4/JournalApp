import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';
import { purpleTheme } from './';

type Props = {
	children: ReactNode;
};
export const AppTheme = ({ children }: Props) => {
	return (
		<ThemeProvider theme={purpleTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
