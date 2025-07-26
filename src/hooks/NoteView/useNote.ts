import { useSelector } from 'react-redux';
import { useNoteForm } from './useNoteForm';
import { useNoteActions } from './useNoteActions';
import { useNoteDerivedValues } from './useNoteDerivedValues';
import type { RootState } from '../../store/store';

export const useNote = () => {
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);

	const { handleSubmit, isSaveEnabled, isUpToDate, register } = useNoteForm();

	const { onClosingNote, onDeleteNote, onUpdateNote, onUploadImages } =
		useNoteActions({ isUpToDate });

	const { fileInputRef, styledDate } = useNoteDerivedValues();

	return {
		activeNote,
		fileInputRef,
		handleSubmit,
		isSaveEnabled,
		isSaving,
		onClosingNote,
		onDeleteNote,
		onUpdateNote,
		onUploadImages,
		register,
		styledDate,
	};
};
