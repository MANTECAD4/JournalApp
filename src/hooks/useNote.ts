import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';

import { useAppDispatch, type RootState } from '../store/store';
import { startUpdatingNote } from '../store/journal/thunks';

import { toast } from 'react-toastify';
import { startUploadingImages } from '../store/journal/thunks/startUploadingImages';

export type NoteViewTextFields = {
	title: string;
	body: string;
};

export const useNote = () => {
	// ======= Global State =======
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);

	const [draftForm, setDraftForm] = useState({
		title: activeNote?.title,
		body: activeNote?.body,
	});

	// ======= Dispatcher =======
	const dispatch = useAppDispatch();

	// ======= Form Setup =======
	const { handleSubmit, register, reset, watch } = useForm<NoteViewTextFields>({
		defaultValues: {
			title: activeNote!.title,
			body: activeNote!.body,
		},
	});

	// ======= Debounced form watcher - draft form version =======
	const title = watch('title');
	const body = watch('body');
	const memoFormState = useMemo(() => ({ title, body }), [title, body]);
	const debouncedForm = useDebounce(memoFormState, 1000);

	useEffect(() => {
		setDraftForm(debouncedForm);
	}, [debouncedForm, setDraftForm]);

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
	const onUpdateNote: SubmitHandler<NoteViewTextFields> = (data) => {
		const currentNotePayload = {
			title: activeNote!.title,
			body: activeNote!.body,
		};

		if (JSON.stringify(draftForm) === JSON.stringify(currentNotePayload)) {
			toast.success(`Everything's up to date.`);
			return;
		}

		dispatch(
			startUpdatingNote({
				id: activeNote!.id,
				date: activeNote!.date,
				body: data.body,
				title: data.title,
				imageURLs: activeNote!.imageURLs,
			})
		);
		toast.success('Note updated', {});
	};
	// ======= Delete note logic =======
	const onDeleteNote = () => {
		const currentNotePayload = {
			title: activeNote!.title,
			body: activeNote!.body,
		};

		if (JSON.stringify(draftForm) !== JSON.stringify(currentNotePayload)) {
			toast.warn(`You have unsaved changes.`);
			return;
		}
		console.log('Close note process goes here...');
	};

	// ======= Close note logic =======
	const onClosingNote = () => {
		const currentNotePayload = {
			title: activeNote!.title,
			body: activeNote!.body,
		};

		if (JSON.stringify(draftForm) !== JSON.stringify(currentNotePayload)) {
			toast.warn(`You have unsaved changes.`);
			return;
		}
		console.log('Delete process goes here...');
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
		[activeNote]
	);

	// ======= Handle file uploading =======
	const fileInputRef = useRef<HTMLInputElement>(null);

	// ======= Linking file input with hook form  =======
	const onUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawFiles = event.target.files;
		if (!rawFiles || rawFiles.length === 0) return;
		const selected = Array.from(rawFiles);
		dispatch(startUploadingImages(selected));
	};

	// ======= Return exposed values =======
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
		watch,
	};
};
