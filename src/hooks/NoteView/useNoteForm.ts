import { useEffect, useMemo } from 'react';
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

	// ========= Form Setup =========
	const { register, reset, watch } = useForm<NoteViewTextFields>({
		defaultValues: {
			title: activeNote!.title,
			body: activeNote!.body,
		},
	});

	const title = watch('title');
	const body = watch('body');

	const isNoteEmpty = useMemo(
		() =>
			title.trim().length < 1 &&
			body.trim().length < 1 &&
			activeNote!.imageUrls.length === 0,
		[title, body, activeNote]
	);

	// ========= Form Sync on Note Change =========
	useEffect(() => {
		if (activeNote) {
			reset({
				title: activeNote.title,
				body: activeNote.body,
			});
		}
	}, [activeNote, reset]);

	// ========= Debounced Draft Sync =========
	const memoFormState = useMemo(
		() => ({
			formPayload: { title: title.trim(), body: body.trim() },
			isSaveEnabled:
				title.trim().length > 0 ||
				body.trim().length > 0 ||
				activeNote!.imageUrls.length > 0,
			isUpToDate:
				JSON.stringify({
					title: activeNote!.title,
					body: activeNote!.body,
				}) === JSON.stringify({ title: title.trim(), body: body.trim() }),
		}),
		[title, body]
	);
	const debouncedForm = useDebounce(memoFormState, 1500);

	useEffect(() => {
		if (debouncedForm.isSaveEnabled && !debouncedForm.isUpToDate) {
			dispatch(startUpdatingNote(debouncedForm.formPayload));
		}
	}, [debouncedForm, dispatch, startUpdatingNote]);

	return {
		isNoteEmpty,
		register,
	};
};
