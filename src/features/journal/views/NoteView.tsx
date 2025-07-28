import { useNote } from '../../../hooks/NoteView/useNote';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { AnimatePresence, motion } from 'motion/react';
import {
	CloseNoteButton,
	DeleteNoteButton,
	SaveNoteButton,
	UploadImagesButton,
} from '../components/NoteView/Buttons/';
import { FormTextFields } from '../components/NoteView/TextFields/FormTextFields';

export const NoteView = () => {
	const {
		activeNote,
		draftForm,
		isSaveEnabled,
		isSaving,
		isUpToDate,
		register,
		styledDate,
	} = useNote();

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
					{/* Header part of the view */}
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						sx={{ width: '100%' }}
					>
						{/* Date display */}
						<Grid>
							<Typography fontSize={39} fontFamily="cursive" fontWeight="light">
								{styledDate}
							</Typography>
						</Grid>
						{/* Buttons group */}
						<Grid>
							<SaveNoteButton
								isSaving={isSaving}
								draftForm={draftForm}
								isSaveEnabled={isSaveEnabled}
								isUpToDate={isUpToDate}
							/>
							<CloseNoteButton isSaving={isSaving} isUpToDate={isUpToDate} />
							<DeleteNoteButton isSaving={isSaving} isUpToDate={isUpToDate} />
						</Grid>
					</Grid>

					<Divider sx={{ width: '100%', mb: 2 }} />
					{/* Form data */}
					<FormTextFields register={register} />
					{/* Masonr */}
					<ImageGallery images={activeNote.imageURLs} />
					{/* Upload images floating button */}
					<UploadImagesButton isSaving={isSaving} draftForm={draftForm} />
				</Grid>
			</motion.div>
		</AnimatePresence>
	);
};
