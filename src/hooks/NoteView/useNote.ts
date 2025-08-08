import { useNoteForm } from './useNoteForm';
import { useNoteDerivedValues } from './useNoteDerivedValues';

export const useNote = () => {
	const { register, isNoteEmpty } = useNoteForm();

	const { styledDate } = useNoteDerivedValues();

	return {
		isNoteEmpty,
		register,
		styledDate,
	};
};
