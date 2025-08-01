import { useRef } from 'react';
import { Fab } from '@mui/material';
import { UploadOutlined } from '@mui/icons-material';
import { useAppDispatch, type RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';
import { fileUpload } from '../../../../../helpers/journal/fileUpload';
import { startUpdatingNote } from '../../../../../store/journal/thunks';
import { toast } from 'react-toastify';
import type { NoteImage } from '../../../../../store/journal/journalSlice.types';
export const UploadImagesButton = () => {
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

			const { imageUrls: prevImages } = activeNote!;
			const CloudinaryImageURLs = await Promise.all(fileUploadPromises);
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

	return (
		<>
			<Fab
				title="Upload images"
				onClick={() => fileInputRef.current!.click()}
				disabled={isSaving}
				size="large"
				sx={{
					':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					backgroundColor: 'error.main',
					bottom: 40,
					color: 'white',
					position: 'fixed',
					right: 40,
				}}
			>
				<UploadOutlined sx={{ fontSize: 35 }} />
			</Fab>
			<input
				style={{ display: 'none' }}
				type="file"
				ref={fileInputRef}
				multiple
				onChange={onUploadImages}
			/>
		</>
	);
};
