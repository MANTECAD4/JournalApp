import { useForm, type SubmitHandler } from 'react-hook-form';
import type { RegisterInputs } from '../auth/pages/Types';
import { startCreatingUserWithEmailPassword } from '../store/auth/thunks';
import { useAppDispatch, type RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useRegister = () => {
	const dispatch = useAppDispatch();
	const { status, errorMessage } = useSelector(
		(state: RootState) => state.auth
	);
	const isCheckingAuth = useMemo(() => status === 'checking', [status]);
	const { register, handleSubmit, formState } = useForm<RegisterInputs>();
	const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
		dispatch(startCreatingUserWithEmailPassword(data));
	};
	return {
		errorMessage,
		errors: formState.errors,
		handleSubmit,
		onSubmit,
		register,
		isCheckingAuth,
	};
};
