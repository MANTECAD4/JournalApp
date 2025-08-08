import { useSelector } from 'react-redux';
import { Divider, Grid, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { useNote } from '@/hooks/NoteView/useNote';
import {
	CloseNoteButton,
	DeleteNoteButton,
	FormTextFields,
	ImageGallery,
	SyncFormLabel,
	UploadImagesButton,
} from '@/features/journal/components/NoteView';

import type { RootState } from '@/store/store';

export const NoteView = () => {
	const { activeNote } = useSelector((state: RootState) => state.journal);
	const { register, styledDate } = useNote();

	if (!activeNote) return;

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={activeNote.id}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1 }}
				transition={{ duration: 0.1 }}
			>
				<Grid
					className="animate__animated animate__fadeIn"
					sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
				>
					{/* Heading part of the view */}
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						sx={{ width: '100%' }}
					>
						<Grid
							container
							direction={'row'}
							alignItems={'center'}
							justifyContent={'center'}
						>
							{/* Date display */}
							<Typography
								sx={{ mr: 2 }}
								fontSize={39}
								fontFamily="cursive"
								fontWeight="light"
							>
								{styledDate}
							</Typography>

							{/* Sync Flag  */}
							<SyncFormLabel />
						</Grid>
						{/* Buttons group */}
						<Grid
							container
							direction={'row'}
							// justifyContent={'center'}
							alignItems={'center'}
						>
							<CloseNoteButton />
							<DeleteNoteButton />
						</Grid>
					</Grid>

					<Divider sx={{ width: '100%', mb: 2 }} />
					{/* Form data */}
					<FormTextFields register={register} />
					{/* Masonry */}
					<ImageGallery images={activeNote.imageUrls} />
					{/* Upload images floating button */}
					<UploadImagesButton />
				</Grid>
			</motion.div>
		</AnimatePresence>
	);
};
