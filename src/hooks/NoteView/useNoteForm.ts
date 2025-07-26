import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import type { RootState } from '../../store/store';
import type { NoteViewTextFields } from './useNote.types';

/**
 * NoteView Logic related to form
 * @returns
 */
export const useNoteForm = () => {
	const { activeNote } = useSelector((state: RootState) => state.journal);
	const [draftForm, setDraftForm] = useState({
		title: activeNote?.title,
		body: activeNote?.body,
	});

	const currentNotePayload = {
		title: activeNote!.title,
		body: activeNote!.body,
	};
	// TODO: Enviar el borrador de la nota al estado global
	const isUpToDate =
		JSON.stringify(draftForm) === JSON.stringify(currentNotePayload);

	// ========= Form Setup =========
	const { handleSubmit, register, reset, watch } = useForm<NoteViewTextFields>({
		defaultValues: {
			title: activeNote!.title,
			body: activeNote!.body,
		},
	});

	const title = watch('title');
	const body = watch('body');
	const isSaveEnabled = title.trim().length > 0 || body.trim().length > 0;

	// ========= Debounced Draft Sync =========
	const memoFormState = useMemo(() => ({ title, body }), [title, body]);
	const debouncedForm = useDebounce(memoFormState, 1000);

	useEffect(() => {
		setDraftForm(debouncedForm);
	}, [debouncedForm]);

	// ========= Form Sync on Note Change =========
	useEffect(() => {
		if (activeNote) {
			reset({
				title: activeNote.title,
				body: activeNote.body,
			});
		}
	}, [activeNote, reset]);

	return {
		handleSubmit,
		isSaveEnabled,
		isUpToDate,
		register,
	};
};
