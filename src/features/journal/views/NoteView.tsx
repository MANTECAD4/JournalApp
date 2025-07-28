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
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						sx={{ width: '100%' }}
					>
						<Grid>
							<Typography fontSize={39} fontFamily="cursive" fontWeight="light">
								{styledDate}
							</Typography>
						</Grid>
						<Grid>
							<SaveNoteButton
								isSaving={isSaving}
								draftForm={draftForm}
								isSaveEnabled={isSaveEnabled}
								isUpToDate={isUpToDate}
							/>
							<CloseNoteButton isSaving={isSaving} />
							<DeleteNoteButton isSaving={isSaving} isUpToDate={isUpToDate} />
						</Grid>
					</Grid>
					<Divider sx={{ width: '100%', mb: 2 }} />
					{/* Text Fields */}
					<Grid container sx={{ width: '100%' }}>
						<TextField
							type="text"
							variant="outlined"
							fullWidth
							placeholder="Start with a title! Dear diary..."
							{...register('title')}
							// label="Title"
							sx={{
								border: 'none',
								mb: 2,
							}}
							slotProps={{
								htmlInput: {
									sx: {
										'::placeholder': {
											fontFamily: 'Monsieur La Doulaise',
											fontStyle: 'italic',
										},
									},
								},
							}}
						/>
						<TextField
							type="text"
							multiline
							variant="outlined"
							fullWidth
							placeholder="What happened today??"
							minRows={5}
							{...register('body')}
							sx={{ border: 'none', mb: 2 }}
							slotProps={{
								htmlInput: {
									sx: {
										'::placeholder': {
											fontFamily: 'Monsieur La Doulaise',
											fontStyle: 'italic',
										},
									},
								},
							}}
						/>
					</Grid>
					<ImageGallery images={activeNote.imageURLs} />
					<UploadImagesButton isSaving={isSaving} draftForm={draftForm} />
				</Grid>
			</motion.div>
		</AnimatePresence>
	);
};
