import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';

import { useAppDispatch, type RootState } from '../store/store';
import { startUpdatingNote } from '../store/journal/thunks';
import { journalActions } from '../store/journal/journalSlice';

export type NoteViewInputs = {
	title: string;
	body: string;
	imageURLs: string[];
};

export const useNote = () => {
	// ======= Global State =======
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);

	// ======= Dispatcher =======
	const dispatch = useAppDispatch();

	// ======= Form Setup =======
	const { register, handleSubmit, watch, reset } = useForm<NoteViewInputs>({
		defaultValues: {
			title: activeNote!.title,
			body: activeNote!.body,
		},
	});

	// ======= Debounced form watcher - auto local save=======
	// const title = watch('title');
	// const body = watch('body');
	// const memoFormState = useMemo(() => ({ title, body }), [title, body]);
	// const debouncedForm = useDebounce(memoFormState, 1500);

	// useEffect(() => {
	// 	dispatch(
	// 		journalActions.setActiveNote({
	// 			...activeNote!,
	// 			body: debouncedForm.body,
	// 			title: debouncedForm.title,
	// 		})
	// 	);
	// }, [debouncedForm]);

	// ======= Sync form when activeNote changes =======
	useEffect(() => {
		if (activeNote) {
			reset({
				title: activeNote.title,
				body: activeNote.body,
			});
		}
	}, [activeNote, reset]);

	// ======= Form Submit Logic =======
	const onUpdateNote: SubmitHandler<NoteViewInputs> = (data) => {
		console.log('guardado manual');
		const currentNote = {
			title: activeNote!.title,
			body: activeNote!.body,
		};

		if (JSON.stringify(data) === JSON.stringify(currentNote)) {
			console.log('Everything up to date');
			return;
		}

		dispatch(
			startUpdatingNote({
				id: activeNote!.id,
				date: activeNote!.date,
				...data,
			})
		);
	};

	// ======= Derived Values =======
	const isSaveEnabled =
		watch('title').trim().length > 0 || watch('body').trim().length > 0;

	const styledDate = useMemo(
		() =>
			new Date(activeNote!.date).toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
			}),
		[]
	);

	// ======= Return exposed values =======
	return {
		activeNote,
		isSaveEnabled,
		handleSubmit,
		isSaving,
		onUpdateNote,
		register,
		styledDate,
		watch,
	};
};
