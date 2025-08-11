import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { startUpdatingNote } from '@/store/journal/thunks';
import { fileUpload } from '@/helpers/journal/fileUpload';
import type { NoteImage } from '@/store/journal/journalSlice.types';
import { useAppDispatch, type RootState } from '@/store/store';

export const useUploadImgs = () => {
	const dispatch = useAppDispatch();
	const { activeNote, isSaving } = useSelector(
		(state: RootState) => state.journal
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// --- Upload Images ---
	const onUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const rawFiles = event.target.files;
			if (!rawFiles || rawFiles.length === 0) return;
			const files = Array.from(rawFiles);
			const fileUploadPromises: Promise<NoteImage>[] = [];
			for (const file of files) {
				fileUploadPromises.push(fileUpload(file));
			}

			const CloudinaryImageURLs = await Promise.all(fileUploadPromises);
			const { imageUrls: prevImages } = activeNote!;
			const newImageUrls = CloudinaryImageURLs.concat(prevImages);
			dispatch(
				startUpdatingNote({
					body: activeNote!.body.trim(),
					title: activeNote!.title.trim(),
					imageUrls: newImageUrls,
				})
			);
			toast.success('Images successfully loaded.');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return {
		fileInputRef,
		onUploadImages,
		isSaving,
	};
};
