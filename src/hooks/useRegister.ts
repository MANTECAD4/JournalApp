import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch, type RootState } from '../store/store';
import { startCreatingUserWithEmailPassword } from '../store/auth/thunks';
import type { RegisterInputs } from '../auth/pages/Types';

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
