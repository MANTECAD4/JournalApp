import '@testing-library/jest-dom';
// import 'isomorphic-fetch'; // Optional
import 'whatwg-fetch';

require('dotenv').config({
	path: '.env.test',
	debug: false,
});

jest.mock('./src/helpers/firebase/getEnvironment', () => ({
	getEnvironment: () => {
		return { ...process.env };
	},
}));
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
