import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../store/store';
import type { RootState } from '../store/store';
import {
	startEmailAndPasswordSignIn,
	startGoogleSignIn,
} from '../store/auth/thunks';

export type LoginInputs = {
	email: string;
	password: string;
};

export const useLogin = () => {
	const { status, errorMessage } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>();

	const onSubmit: SubmitHandler<LoginInputs> = (data) => {
		dispatch(startEmailAndPasswordSignIn(data));
	};

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return {
		errorMessage,
		errors,
		handleSubmit,
		onGoogleSignIn,
		onSubmit,
		register,
		status,
	};
};
