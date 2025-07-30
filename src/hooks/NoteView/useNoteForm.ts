import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import { useAppDispatch, type RootState } from '../../store/store';
import type { NoteViewTextFields } from './useNote.types';
import { startUpdatingNote } from '../../store/journal/thunks';

/**
 * NoteView Logic related to form
 * @returns
 */
export const useNoteForm = () => {
	const { activeNote } = useSelector((state: RootState) => state.journal);
	const dispatch = useAppDispatch();

	const currentNotePayload = {
		title: activeNote!.title,
		body: activeNote!.body,
	};

	// ========= Form Setup =========
	const { register, reset, watch } = useForm<NoteViewTextFields>({
		defaultValues: {
			title: activeNote!.title,
			body: activeNote!.body,
		},
	});

	const title = watch('title');
	const body = watch('body');

	// ========= Form Sync on Note Change =========
	useEffect(() => {
		if (activeNote) {
			reset({
				title: activeNote.title,
				body: activeNote.body,
			});
			// setDraftForm({
			// 	title: activeNote.title,
			// 	body: activeNote.body,
			// });
		}
	}, [activeNote, reset]);

	const [draftForm, setDraftForm] = useState({
		title: activeNote?.title || '',
		body: activeNote?.body || '',
	});

	// ========= Debounced Draft Sync =========
	const memoFormState = useMemo(() => ({ title, body }), [title, body]);
	const debouncedForm = useDebounce(memoFormState, 1500);

	useEffect(() => {
		setDraftForm(debouncedForm);
	}, [debouncedForm]);

	const isUpToDate = useMemo(
		() =>
			JSON.stringify({
				title: draftForm.title.trim(),
				body: draftForm.body.trim(),
			}) === JSON.stringify(currentNotePayload),
		[draftForm, currentNotePayload]
	);

	const isSaveEnabled = useMemo(
		() =>
			title.trim().length > 0 ||
			body.trim().length > 0 ||
			activeNote!.imageUrls.length > 0,
		[title, body, activeNote]
	);

	return {
		draftForm,
		isSaveEnabled,
		isUpToDate,
		register,
	};
};
