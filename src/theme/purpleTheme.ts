import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
	palette: {
		primary: {
			main: '#262254',
		},
		secondary: {
			main: 'rgb(84, 56, 132)',
		},
		error: {
			main: red.A400,
		},
	},
});
