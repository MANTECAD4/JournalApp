// import { useState } from 'react';

// type formState = {
// 	displayName?: string;
// 	email: string;
// 	password: string;
// };
// export const useForm = (initialState: formState) => {
// 	const [formState, setFormState] = useState(initialState);

// 	const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = target;
// 		if (!name) throw new Error('name field required');

// 		setFormState((currentState) => ({
// 			...currentState,
// 			[name]: value,
// 		}));
// 	};

// 	const onResetForm = () => {
// 		setFormState(initialState);
// 	};

// 	return {
// 		formState,
// 		onInputChange,
// 		onResetForm,
// 	};
// };
