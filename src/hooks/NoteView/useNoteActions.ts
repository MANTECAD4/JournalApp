import type { SubmitHandler } from 'react-hook-form';
import { useAppDispatch, type RootState } from '../../store/store';
import type { NoteViewTextFields } from './useNote.types';
import { toast } from 'react-toastify';
import { startUpdatingNote } from '../../store/journal/thunks';
import { useSelector } from 'react-redux';
import { startDeletingNote } from '../../store/journal/thunks/startDeletingNote';
import { startUploadingImages } from '../../store/journal/thunks/startUploadingImages';
import { journalActions } from '../../store/journal/journalSlice';

type Props = {
	isUpToDate: boolean;
};

/**
 *
 * @param {Boolean} isUpToDate - Current form content = activeNote content?
 * @returns
 */
export const useNoteActions = ({ isUpToDate }: Props) => {
	const dispatch = useAppDispatch();
	const { activeNote } = useSelector((state: RootState) => state.journal);
	// --- Update Note ---
	const onUpdateNote: SubmitHandler<NoteViewTextFields> = (data) => {
		if (isUpToDate) {
			toast.success(`Everything's up to date.`);
			return;
		}

		dispatch(
			startUpdatingNote({
				id: activeNote!.id,
				date: activeNote!.date,
				body: data.body.trim(),
				title: data.title.trim(),
				imageURLs: activeNote!.imageURLs,
			})
		);

		toast.success('Note updated');
	};

	// --- Delete Note ---
	const onDeleteNote = () => {
		if (!isUpToDate) {
			toast.warn(`You have unsaved changes.`);
			return;
		}
		try {
			dispatch(startDeletingNote());
			toast.success('Note deleted');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	// --- Upload Images ---
	const onUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const rawFiles = event.target.files;
			if (!rawFiles || rawFiles.length === 0) return;
			const selectedFiles = Array.from(rawFiles);
			dispatch(startUploadingImages(selectedFiles));
			toast.success('Images successfully loaded.');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	// --- Close Note ---
	const onClosingNote = () => {
		if (!isUpToDate) {
			toast.warn(`You have unsaved changes.`);
			return;
		}
		dispatch(journalActions.closeNote());
	};
	return {
		onClosingNote,
		onDeleteNote,
		onUpdateNote,
		onUploadImages,
	};
};
