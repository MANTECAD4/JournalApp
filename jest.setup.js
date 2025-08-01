import '@testing-library/jest-dom';
// import 'isomorphic-fetch'; // Optional
import 'whatwg-fetch';
import 'dotenv/config';

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
