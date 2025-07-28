import { useSelector } from 'react-redux';
import { useNoteForm } from './useNoteForm';
import { useNoteDerivedValues } from './useNoteDerivedValues';
import type { RootState } from '../../store/store';

export const useNote = () => {
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);

	const { draftForm, isSaveEnabled, isUpToDate, register } = useNoteForm();

	const { styledDate } = useNoteDerivedValues();

	return {
		activeNote,
		draftForm,
		isSaveEnabled,
		isSaving,
		isUpToDate,
		register,
		styledDate,
	};
};
