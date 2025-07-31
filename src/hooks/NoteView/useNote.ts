import { useNoteForm } from './useNoteForm';
import { useNoteDerivedValues } from './useNoteDerivedValues';

export const useNote = () => {
	const { isSaveEnabled, register } = useNoteForm();

	const { styledDate } = useNoteDerivedValues();

	return {
		isSaveEnabled,
		register,
		styledDate,
	};
};
