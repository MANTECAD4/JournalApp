import { useNoteForm } from './useNoteForm';
import { useNoteDerivedValues } from './useNoteDerivedValues';

export const useNote = () => {
	const { register } = useNoteForm();

	const { styledDate } = useNoteDerivedValues();

	return {
		register,
		styledDate,
	};
};
