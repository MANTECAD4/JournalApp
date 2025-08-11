import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { LoginPage } from '../../../../src/features/auth/pages/LoginPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../../src/store/auth/authSlice';
import { notAuthenticatedState } from '../../../fixtures/authFixtures';

const mockedOnGoogleSignIn = jest.fn();
jest.mock('../../../../src/hooks/useLogin', () => ({
	useLogin: () => ({
		// ...jest.requireActual('../../../../src/hooks/useLogin').useLogin(),
		errorMessage: null,
		errors: {},
		handleSubmit: jest.fn(),
		onSubmit: jest.fn(),
		register: jest.fn(),
		status: 'not-authenticated',
		onGoogleSignIn: mockedOnGoogleSignIn,
	}),
}));

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: { auth: notAuthenticatedState },
});
describe('Login Page', () => {
	it('calls Google sign in via clicking google btn', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
		const googleBtn = screen.getByLabelText('google-btn');
		fireEvent.click(googleBtn);
		expect(mockedOnGoogleSignIn).toHaveBeenCalled();
	});
});
