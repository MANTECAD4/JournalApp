import { useNoteForm } from './useNoteForm';
import { useNoteDerivedValues } from './useNoteDerivedValues';

export const useNote = () => {
	const { draftForm, isSaveEnabled, isUpToDate, register } = useNoteForm();

	const { styledDate } = useNoteDerivedValues();

	return {
		draftForm,
		isSaveEnabled,
		isUpToDate,
		register,
		styledDate,
	};
};
