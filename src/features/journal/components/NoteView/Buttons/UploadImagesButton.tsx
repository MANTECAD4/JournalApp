import { Fab } from '@mui/material';
import { UploadOutlined } from '@mui/icons-material';
import { useUploadImgs } from '@/hooks/NoteView/Buttons/useUploadImgs';
export const UploadImagesButton = () => {
	const { fileInputRef, onUploadImages, isSaving } = useUploadImgs();

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
